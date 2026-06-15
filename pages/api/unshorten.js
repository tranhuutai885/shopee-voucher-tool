export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "Missing url" });

  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const finalUrl = response.url;

    // Extract origin_link nếu là an_redir URL
    if (finalUrl.includes("an_redir") || finalUrl.includes("origin_link=")) {
      const params = new URL(finalUrl).searchParams;
      const originLink = params.get("origin_link");
      if (originLink) {
        return res.status(200).json({ resolvedUrl: decodeURIComponent(originLink) });
      }
    }

    // Là redirect thẳng đến shopee.vn — strip query params
    const u = new URL(finalUrl);
    const cleanUrl = u.origin + u.pathname;
    return res.status(200).json({ resolvedUrl: cleanUrl });

  } catch (err) {
    return res.status(500).json({ error: "Không thể resolve link: " + err.message });
  }
}
