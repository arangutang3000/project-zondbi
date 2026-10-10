/* Non-visual release safeguards. They intentionally leave the portfolio's
   existing renderers and layout untouched. */
(() => {
  const originalNotePages = notePages;
  notePages = function(){
    const pages = originalNotePages();
    pages.services = {
      title: 'Services',
      html: '<h1>SERVICES</h1><p class="note-lead">AVAILABLE FOR PROJECTS</p><h2>DESIGN × WEB</h2><p>Visual identity and websites for artists and brands.</p><div class="note-links"><a href="mailto:ramenskiy.7777@gmail.com">EMAIL ME ↗</a><a href="https://t.me/manjuria_puff616" target="_blank" rel="noopener noreferrer">Telegram ↗</a></div>'
    };
    if (pages.contacts?.html) pages.contacts.html = pages.contacts.html.replace(/<a href="undefined"[^>]*>LinkedIn ↗<\/a>/, '');
    return pages;
  };

  const harden = root => {
    if (root.matches?.('a[target="_blank"]')) root.rel = 'noopener noreferrer';
    root.querySelectorAll?.('a[target="_blank"]').forEach(link => { link.rel = 'noopener noreferrer'; });
  };
  harden(document);
  new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => {
    if (node.nodeType === 1) harden(node);
  }))).observe(document.body, {childList:true, subtree:true});
})();
