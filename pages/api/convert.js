import crypto from "crypto";

const APP_ID = process.env.SHOPEE_APP_ID || "YOUR_APP_ID";
const SECRET_KEY = process.env.SHOPEE_SECRET_KEY || "YOUR_SECRET_KEY";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "Missing url" });
  }

  // Basic Shopee URL validation
  if (!url.includes("shopee.vn") && !url.includes("shope.ee")) {
    return res.status(400).json({ error: "Không phải link Shopee hợp lệ" });
  }

  try {
    const ts = Math.floor(Date.now() / 1000).toString();
    const payload = JSON.stringify({
      query: `mutation {\n    generateShortLink(input:{originUrl:"${url}"}){\n        shortLink\n    }\n}`,
    });

    const sig = crypto
      .createHash("sha256")
      .update(APP_ID + ts + payload + SECRET_KEY)
      .digest("hex");

    const response = await fetch(
      "https://open-api.affiliate.shopee.vn/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `SHA256 Credential=${APP_ID}, Timestamp=${ts}, Signature=${sig}`,
        },
        body: payload,
      }
    );

    const data = await response.json();

    if (data.errors) {
      return res.status(400).json({ error: data.errors[0].message });
    }

    const shortLink = data.data.generateShortLink.shortLink;
    return res.status(200).json({ shortLink });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Lỗi server, thử lại sau" });
  }
}
