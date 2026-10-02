export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {categories.map((c) => (
        <button key={c} type="button" className={`chip ${c === active ? "is-active" : ""}`}
          aria-pressed={c === active} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
