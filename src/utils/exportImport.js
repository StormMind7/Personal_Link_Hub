import { isValidUrl } from "./qr";
import { newId } from "./storage";
import { CATEGORIES } from "../data/defaultLinks";

export function exportLinks(links) {
  const blob = new Blob([JSON.stringify(links, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-links.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Returns { ok: true, links } or { ok: false, error }
export function parseImport(text) {
  let data;
  try { data = JSON.parse(text); } catch { return { ok: false, error: "That file is not valid JSON." }; }
  if (data && !Array.isArray(data) && Array.isArray(data.links)) data = data.links;
  if (!Array.isArray(data)) return { ok: false, error: "Expected a list of links." };
  if (data.length === 0) return { ok: false, error: "The file contains no links." };

  const links = [];
  for (let i = 0; i < data.length; i++) {
    const l = data[i];
    const n = i + 1;
    if (!l || typeof l !== "object") return { ok: false, error: `Item ${n} is not a valid link.` };
    if (typeof l.name !== "string" || !l.name.trim()) return { ok: false, error: `Item ${n} is missing a name.` };
    if (typeof l.url !== "string" || !isValidUrl(l.url.trim())) return { ok: false, error: `"${l.name}" has an invalid URL.` };
    const showQR = l.showQR !== false;
    links.push({
      id: typeof l.id === "string" && l.id ? l.id : newId(),
      name: l.name.trim(),
      url: l.url.trim(),
      description: typeof l.description === "string" ? l.description : "",
      category: typeof l.category === "string" && l.category ? l.category : CATEGORIES[CATEGORIES.length - 1],
      showLink: l.showLink !== false,
      showQR,
      allowQRDownload: showQR && l.allowQRDownload !== false,
      active: l.active !== false,
      order: i + 1,
    });
  }
  return { ok: true, links };
}
