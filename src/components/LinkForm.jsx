import { useState } from "react";
import Toggle from "./Toggle";
import { CATEGORIES } from "../data/defaultLinks";
import { normalizeUrl, isValidUrl } from "../utils/qr";

const blank = {
  name: "", url: "", description: "", category: CATEGORIES[0],
  showLink: true, showQR: true, allowQRDownload: true, active: true,
};

// Used for both adding (initial = undefined) and editing.
export default function LinkForm({ initial, onSave, onCancel }) {
  const [f, setF] = useState({ ...blank, ...initial });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  const set = (key, value) =>
    setF((p) => {
      const n = { ...p, [key]: value };
      if (!n.showQR) n.allowQRDownload = false; // invalid combo is impossible
      return n;
    });

  const submit = (e) => {
    e.preventDefault();
    if (busy) return;
    const name = f.name.trim();
    const url = normalizeUrl(f.url);
    const errs = {};
    if (!name) errs.name = "Link name is required.";
    if (!f.url.trim()) errs.url = "URL is required.";
    else if (!isValidUrl(url)) errs.url = "Enter a valid http(s) URL.";
    if (!f.category) errs.category = "Category is required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    onSave({ ...f, name, url, description: f.description.trim(), allowQRDownload: f.showQR && f.allowQRDownload });
  };

  return (
    <form className="panel form" onSubmit={submit} noValidate>
      <h2>{initial?.id ? "Edit link" : "Add new link"}</h2>

      <label htmlFor="f-name">Link name</label>
      <input id="f-name" value={f.name} onChange={(e) => set("name", e.target.value)}
        aria-invalid={!!errors.name} placeholder="Expense Tracker" autoFocus />
      {errors.name && <p className="error">{errors.name}</p>}

      <label htmlFor="f-url">Link</label>
      <input id="f-url" value={f.url} onChange={(e) => set("url", e.target.value)}
        aria-invalid={!!errors.url} placeholder="https://..." inputMode="url" />
      {errors.url && <p className="error">{errors.url}</p>}

      <label htmlFor="f-desc">Description (optional)</label>
      <textarea id="f-desc" rows={3} value={f.description} onChange={(e) => set("description", e.target.value)} />

      <label htmlFor="f-cat">Category</label>
      <select id="f-cat" value={f.category} onChange={(e) => set("category", e.target.value)}>
        {[...new Set([...CATEGORIES, f.category])].map((c) => <option key={c}>{c}</option>)}
      </select>
      {errors.category && <p className="error">{errors.category}</p>}

      <Toggle label="Show Link" hint="Displays the Open button" checked={f.showLink} onChange={(v) => set("showLink", v)} />
      <Toggle label="Show QR" hint="Displays the QR button" checked={f.showQR} onChange={(v) => set("showQR", v)} />
      <Toggle label="Allow QR Download" hint={f.showQR ? "Lets visitors save the QR image" : "Turn on Show QR first"}
        checked={f.showQR && f.allowQRDownload} disabled={!f.showQR} onChange={(v) => set("allowQRDownload", v)} />

      <div className="row-end">
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={busy}>Save link</button>
      </div>
    </form>
  );
}
