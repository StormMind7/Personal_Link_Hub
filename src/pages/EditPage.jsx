import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getLinks, saveLinks, addLink, updateLink, deleteLink, resetLinks } from "../utils/storage";
import { exportLinks, parseImport } from "../utils/exportImport";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/LinkList";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";
import ThemeToggle from "../components/ThemeToggle";

export default function EditPage() {
  const [links, setLinks] = useState(getLinks);
  const [editing, setEditing] = useState(null); // null | "new" | link object
  const [confirm, setConfirm] = useState(null); // { message, confirmLabel, onConfirm }
  const [msg, setMsg] = useState(null); // { type: "error" | "ok", text }
  const fileRef = useRef(null);

  const handleSave = (data) => {
    setLinks(editing === "new" ? addLink(data) : updateLink(editing.id, data));
    setEditing(null);
    setMsg({ type: "ok", text: "Link saved." });
  };

  const askDelete = (l) =>
    setConfirm({
      message: "Are you sure you want to delete this link?",
      confirmLabel: "Delete",
      onConfirm: () => { setLinks(deleteLink(l.id)); setConfirm(null); setMsg({ type: "ok", text: `Deleted "${l.name}".` }); },
    });

  const askReset = () =>
    setConfirm({
      message: "Reset everything back to the sample links? Your current links will be lost.",
      confirmLabel: "Reset",
      onConfirm: () => { setLinks(resetLinks()); setConfirm(null); setMsg({ type: "ok", text: "Links reset." }); },
    });

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    let result;
    try { result = parseImport(await file.text()); }
    catch { result = { ok: false, error: "Could not read that file." }; }
    if (!result.ok) { setMsg({ type: "error", text: `Import failed: ${result.error}` }); return; }
    setMsg(null);
    setConfirm({
      message: `Replace your ${links.length} current links with ${result.links.length} imported links?`,
      confirmLabel: "Replace",
      onConfirm: () => { setLinks(saveLinks(result.links)); setConfirm(null); setMsg({ type: "ok", text: "Links imported." }); },
    });
  };

  return (
    <div className="page edit-page">
      <div className="topbar">
        <Link to="/" className="subtle-link">← Back to hub</Link>
        <ThemeToggle />
      </div>
      <h1 className="edit-title">Edit links</h1>

      <div className="toolbar">
        <button type="button" className="btn btn-primary" onClick={() => setEditing("new")}>+ Add new link</button>
        <button type="button" className="btn" onClick={() => exportLinks(links)}>Export JSON</button>
        <button type="button" className="btn" onClick={() => fileRef.current?.click()}>Import JSON</button>
        <button type="button" className="btn" onClick={askReset}>Reset</button>
        <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={handleFile} />
      </div>

      {msg && <p role="status" className={`notice ${msg.type}`}>{msg.text}</p>}

      {editing && (
        <LinkForm key={editing === "new" ? "new" : editing.id}
          initial={editing === "new" ? undefined : editing}
          onSave={handleSave} onCancel={() => setEditing(null)} />
      )}

      {links.length ? (
        <LinkList links={links} onEdit={setEditing} onDelete={askDelete}
          onToggleActive={(l) => setLinks(updateLink(l.id, { active: !l.active }))}
          onReorder={(next) => setLinks(saveLinks(next))} />
      ) : (
        <EmptyState title="No links yet" text="Add your first link above." />
      )}

      {confirm && <ConfirmDialog {...confirm} onCancel={() => setConfirm(null)} />}
    </div>
  );
}
