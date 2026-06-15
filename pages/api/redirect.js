export default function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).end();

  // Validate chỉ cho redirect sang Shopee
  const decoded = decodeURIComponent(url);
  if (!decoded.includes("shopee.vn") && !decoded.includes("s.shopee.vn")) {
    return res.status(400).end();
  }

  // Server-side redirect → referrer = '' phía Shopee
  res.setHeader("Referrer-Policy", "no-referrer");
  res.redirect(302, decoded);
}
