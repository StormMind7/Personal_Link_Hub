export default function LinkCard({ link, onShowQR, onDownload }) {
  const canDownload = link.showQR && link.allowQRDownload;
  return (
    <article className="card">
      <div>
        <span className="card-cat">{link.category}</span>
        <h2 className="card-title">{link.name}</h2>
        {link.description && <p className="card-desc">{link.description}</p>}
      </div>
      <div className="card-actions">
        {link.showLink && (
          <a className="btn btn-primary" href={link.url} target="_blank" rel="noopener noreferrer">
            Open
          </a>
        )}
        {(link.showQR || canDownload) && (
          <div className="card-secondary">
            {link.showQR && (
              <button type="button" className="btn" onClick={() => onShowQR(link)}>QR</button>
            )}
            {canDownload && (
              <button type="button" className="btn" onClick={() => onDownload(link)}>Download</button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
