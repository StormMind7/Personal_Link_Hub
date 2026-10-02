import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getLinks } from "../utils/storage";
import { CATEGORIES } from "../data/defaultLinks";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import LinkCard from "../components/LinkCard";
import QRModal from "../components/QRModal";
import EmptyState from "../components/EmptyState";
import { makeQrDataUrl, slugify, downloadDataUrl } from "../utils/qr";
import ThemeToggle from "../components/ThemeToggle";

export default function UserPage() {
  const [links] = useState(getLinks);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [qrLink, setQrLink] = useState(null);

  const download = async (l) => {
    try { downloadDataUrl(await makeQrDataUrl(l.url), `${slugify(l.name)}-qr.png`); } catch { /* ignore */ }
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return links.filter((l) => {
      if (!l.active) return false;
      if (category !== "All" && l.category !== category) return false;
      if (!q) return true;
      return [l.name, l.description, l.category, l.url].some((v) => (v || "").toLowerCase().includes(q));
    });
  }, [links, query, category]);

  return (
    <div className="page">
      <div className="topbar">
        <Link to="/edit" className="subtle-link">Edit</Link>
        <ThemeToggle />
      </div>
      <header className="hero">
        <p className="eyebrow">JSE7EN</p>
        <h1>My Digital Desk</h1>
        <p className="muted">Everything I need, in one place.</p>
      </header>
      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter categories={["All", ...CATEGORIES]} active={category} onChange={setCategory} />
      </div>
      <main>
        {visible.length ? (
          <div className="grid">
            {visible.map((l) => <LinkCard key={l.id} link={l} onShowQR={setQrLink} onDownload={download} />)}
          </div>
        ) : (
          <EmptyState text="Try a different search or category." />
        )}
      </main>
      {qrLink && <QRModal link={qrLink} onClose={() => setQrLink(null)} />}
    </div>
  );
}
