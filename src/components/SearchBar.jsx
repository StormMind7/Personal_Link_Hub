export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <span aria-hidden="true">🔍</span>
      <input type="search" value={value} onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects, tools or links..." aria-label="Search links" />
    </div>
  );
}
