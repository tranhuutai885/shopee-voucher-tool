export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).end();

  const decoded = decodeURIComponent(url);

  // Validate chỉ cho redirect sang Shopee
  if (!decoded.includes("shopee.vn") && !decoded.includes("s.shopee.vn")) {
    return res.status(400).end();
  }

  try {
    // Resolve toàn bộ redirect chain phía server
    // → lấy URL đích cuối cùng (shopee.vn/product/...)
    const response = await fetch(decoded, {
      method: "GET",
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
      },
    });

    const finalUrl = response.url;

    // Redirect user thẳng đến URL đích — 1 hop duy nhất
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Cache-Control", "no-store");
    res.redirect(302, finalUrl);

  } catch (err) {
    // Fallback: redirect thẳng URL gốc nếu resolve fail
    res.setHeader("Referrer-Policy", "no-referrer");
    res.redirect(302, decoded);
  }
}
