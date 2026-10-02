import { useState } from "react";

export default function LinkList({ links, onEdit, onDelete, onToggleActive, onReorder }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  const move = (from, to) => {
    if (to < 0 || to >= links.length || from === to) return;
    const next = [...links];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onReorder(next);
  };
  const end = () => { setDragIndex(null); setOverIndex(null); };

  return (
    <ul className="edit-list">
      {links.map((l, i) => (
        <li key={l.id} draggable
          className={`edit-item ${overIndex === i && dragIndex !== i ? "is-over" : ""} ${dragIndex === i ? "is-dragging" : ""}`}
          onDragStart={(e) => { setDragIndex(i); e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", l.id); }}
          onDragOver={(e) => { e.preventDefault(); setOverIndex(i); }}
          onDrop={(e) => { e.preventDefault(); if (dragIndex !== null) move(dragIndex, i); end(); }}
          onDragEnd={end}>
          <span className="handle" aria-hidden="true" title="Drag to reorder">☰</span>
          <div className="edit-main">
            <strong>{l.name}</strong>
            <span className="edit-url">{l.url}</span>
            <span className="meta">
              <span>{l.category}</span>
              <span className={l.active ? "status on" : "status off"}>{l.active ? "Active" : "Inactive"}</span>
            </span>
          </div>
          <div className="edit-actions">
            <button type="button" className="btn btn-sm" aria-label={`Move ${l.name} up`} disabled={i === 0} onClick={() => move(i, i - 1)}>↑</button>
            <button type="button" className="btn btn-sm" aria-label={`Move ${l.name} down`} disabled={i === links.length - 1} onClick={() => move(i, i + 1)}>↓</button>
            <button type="button" className="btn btn-sm" onClick={() => onToggleActive(l)}>{l.active ? "Deactivate" : "Activate"}</button>
            <button type="button" className="btn btn-sm" onClick={() => onEdit(l)}>✏ Edit</button>
            <button type="button" className="btn btn-sm btn-danger-outline" onClick={() => onDelete(l)}>🗑 Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
