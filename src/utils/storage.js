import { defaultLinks } from "../data/defaultLinks";

const KEY = "personal_link_hub_links";
export const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const defaults = () => defaultLinks.map((l) => ({ ...l }));

export function getLinks() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaults();
    return [...parsed].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return defaults();
  }
}

// Saves links in the given order and re-numbers `order`. Returns the saved array.
export function saveLinks(links) {
  const numbered = links.map((l, i) => ({ ...l, order: i + 1 }));
  try {
    localStorage.setItem(KEY, JSON.stringify(numbered));
  } catch (e) {
    console.error("Could not save links", e);
  }
  return numbered;
}

export const addLink = (data) => saveLinks([...getLinks(), { ...data, id: newId() }]);
export const updateLink = (id, patch) =>
  saveLinks(getLinks().map((l) => (l.id === id ? { ...l, ...patch } : l)));
export const deleteLink = (id) => saveLinks(getLinks().filter((l) => l.id !== id));
export function resetLinks() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  return getLinks();
}
