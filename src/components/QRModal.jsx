import { useEffect, useRef, useState } from "react";
import { makeQrDataUrl, slugify, downloadDataUrl } from "../utils/qr";

export default function QRModal({ link, onClose }) {
  const [src, setSrc] = useState("");
  const [failed, setFailed] = useState(false);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    let alive = true;
    makeQrDataUrl(link.url).then((d) => alive && setSrc(d)).catch(() => alive && setFailed(true));
    return () => { alive = false; };
  }, [link.url]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title">
        <button ref={closeRef} type="button" className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
        <h2 id="qr-title">{link.name}</h2>
        <div className="qr-box">
          {src ? <img src={src} alt={`QR code for ${link.name}`} /> : <span>{failed ? "Could not create QR code." : "Generating…"}</span>}
        </div>
        <p className="muted">Scan to open link</p>
        {link.allowQRDownload && link.showQR && src && (
          <button type="button" className="btn btn-primary"
            onClick={() => downloadDataUrl(src, `${slugify(link.name)}-qr.png`)}>
            Download
          </button>
        )}
      </div>
    </div>
  );
}
