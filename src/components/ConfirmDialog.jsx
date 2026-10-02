import { useEffect, useRef } from "react";

export default function ConfirmDialog({ message, confirmLabel = "Delete", onConfirm, onCancel }) {
  const cancelRef = useRef(null);
  const cancelFn = useRef(onCancel);
  cancelFn.current = onCancel;
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && cancelFn.current();
    document.addEventListener("keydown", onKey);
    cancelRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal" role="alertdialog" aria-modal="true" aria-labelledby="confirm-msg">
        <p id="confirm-msg" className="confirm-msg">{message}</p>
        <div className="row-end">
          <button ref={cancelRef} type="button" className="btn" onClick={onCancel}>Cancel</button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
