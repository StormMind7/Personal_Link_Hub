export default function Toggle({ label, checked, onChange, disabled = false, hint }) {
  return (
    <div className={`toggle-row ${disabled ? "is-disabled" : ""}`}>
      <div>
        <span className="toggle-label">{label}</span>
        {hint && <span className="toggle-hint">{hint}</span>}
      </div>
      <button type="button" role="switch" aria-checked={checked} aria-label={label}
        disabled={disabled} className="switch" onClick={() => onChange(!checked)}>
        <span className="switch-thumb" />
      </button>
    </div>
  );
}
