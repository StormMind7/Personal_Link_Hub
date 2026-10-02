# Personal Link Hub

Frontend-only link dashboard (React + Vite + localStorage).

    npm install
    npm run dev      # http://localhost:5173  (user page)  /edit (manage links)
    npm run build    # static output in dist/

- Replace the sample links in `src/data/defaultLinks.js` (used until you save your own).
- Data lives in `localStorage` under `personal_link_hub_links`. Use Export/Import JSON for backups.
- Note: /edit has no password; it is a convenience page, and data is per-browser.
- For static hosts without SPA fallback, swap `BrowserRouter` for `HashRouter` in `src/main.jsx`.

## Updating the project (no need to re-download the whole thing)
Unzip once and keep working in that folder. Future changes arrive as a small
"update" ZIP with only the changed files, using the same paths. Extract it into the
project folder and choose "overwrite/merge". Run `npm install` again only if
`package.json` changed. Your saved links in the browser are not affected.
