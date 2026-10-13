// Load before scripts that read localStorage. No probe writes or saved-value migration.
(() => {
  let native;
  try { native = window.localStorage; } catch (_) { /* Browser policy may deny even the getter. */ }
  const methods = {};
  for (const name of ['getItem', 'setItem', 'removeItem', 'clear', 'key']) {
    try { methods[name] = native[name].bind(native); } catch (_) { /* Unavailable storage. */ }
  }
  const cached = new Map();
  const pending = new Map();
  let cleared = false;
  const keys = () => {
    const found = new Set(cleared ? [] : cached.keys());
    if (!cleared) {
      try {
        for (let i = 0; i < native.length; i++) {
          const key = methods.key(i);
          if (key !== null) found.add(key);
        }
      } catch (_) { /* Retain keys read before storage became unavailable. */ }
    }
    for (const [key, value] of pending) {
      if (value === null) found.delete(key);
      else found.add(key);
    }
    return [...found];
  };
  const storage = {
    getItem(key) {
      key = String(key);
      if (pending.has(key)) return pending.get(key);
      if (cleared) return null;
      try {
        const value = methods.getItem(key);
        if (value === null) cached.delete(key);
        else cached.set(key, value);
        return value;
      } catch (_) { return cached.has(key) ? cached.get(key) : null; }
    },
    setItem(key, value) {
      key = String(key); value = String(value);
      try {
        methods.setItem(key, value);
        cached.set(key, value);
        if (cleared) pending.set(key, value);
        else pending.delete(key);
      } catch (_) { pending.set(key, value); }
    },
    removeItem(key) {
      key = String(key);
      cached.delete(key);
      try { methods.removeItem(key); pending.delete(key); }
      catch (_) { pending.set(key, null); }
    },
    clear() {
      try { methods.clear(); } catch (_) { /* Session-only clear when persistence is denied. */ }
      cached.clear(); pending.clear(); cleared = true;
    },
    key(index) { return keys()[Number(index) >>> 0] ?? null; },
    get length() { return keys().length; }
  };
  // Passive snapshot: never replace or overwrite any existing persisted value.
  for (const key of keys()) storage.getItem(key);
  window.safeStorage = storage;
  try {
    Object.defineProperty(window, 'localStorage', {configurable: true, enumerable: true, get: () => storage});
  } catch (_) {
    // Locked Window properties can still expose Storage methods on the prototype.
    // Do not define properties on Storage itself: some engines treat them as persisted keys.
    if (native) {
      for (const name of Object.keys(methods)) {
        try {
          const original = window.Storage.prototype[name];
          const replacement = storage[name].bind(storage);
          Object.defineProperty(window.Storage.prototype, name, {
            configurable: true, writable: true,
            value: function(...args) {
              return this === native ? replacement(...args) : original.apply(this, args);
            }
          });
        } catch (_) { /* safeStorage remains available for fully locked hosts. */ }
      }
    }
  }
})();
