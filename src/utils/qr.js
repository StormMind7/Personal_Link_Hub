import QRCode from "qrcode";

export const makeQrDataUrl = (url) =>
  QRCode.toDataURL(url, { width: 512, margin: 2, errorCorrectionLevel: "M" });

export function normalizeUrl(input = "") {
  const t = input.trim();
  if (!t) return "";
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : `https://${t}`;
}

export function isValidUrl(input) {
  try {
    const u = new URL(input);
    return ["http:", "https:"].includes(u.protocol) && (u.hostname.includes(".") || u.hostname === "localhost");
  } catch {
    return false;
  }
}

export const slugify = (s = "") =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "link";

export function downloadDataUrl(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}
