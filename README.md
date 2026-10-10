# ByManjuria — portfolio

Static portfolio for ByManjuria. It does not use a backend, database, accounts,
payments, or environment variables. The public site is served directly from the
repository root.

## Run locally

From the project folder:

```sh
python3 -m http.server 4174 --bind 127.0.0.1
```

Open `http://127.0.0.1:4174/`. Do not rely on opening `index.html` directly:
browser privacy rules can block media and embedded services in that mode.

## Structure

- `index.html` — page shell and script order.
- `script.js` — window manager, content data, Dock, and basic interactions.
- `v20-editorial-update.js`, `v23-manual-layout.js` — current portfolio content layouts.
- `final.js` — accessibility controls for local videos and final interface polish.
- `production.js` — release guardrails for language state and media cleanup.
- `assets/` — published portfolio media.
- `_headers` — security headers recognised by Netlify and Cloudflare Pages.

Older visual passes (`v14`–`v19`) stay in the repository as history but are not
loaded by the site.

## Publishing checklist

1. Test the site locally in desktop and mobile browsers.
2. Check every external link, download, language toggle, Dock icon and openable window.
3. Compress new images and videos before putting them into `assets/`.
4. Confirm `git status`, then commit the intended version.
5. Deploy the repository root to a static host with HTTPS. Cloudflare Pages or Netlify will apply `_headers`; configure equivalent headers manually on another host.
6. After publishing, verify the live URL in an incognito/private browser and on a phone.

## Updating content

Keep master files outside this repository. Export web versions before adding them:

- photos / artwork: WebP or JPEG where practical;
- videos: H.264 MP4, web-optimised, with a reasonable bitrate;
- use descriptive ASCII file names where possible to avoid hosting portability issues.

The site intentionally does not provide public uploads or editable visitor content.
