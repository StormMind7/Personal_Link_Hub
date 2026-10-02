export default function EmptyState({ title = "No links found", text }) {
  return (
    <div className="empty">
      <div aria-hidden="true" className="empty-icon">🫥</div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
