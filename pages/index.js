import { useState, useEffect, useRef } from "react";
import Head from "next/head";

// ====== CONFIG ======
// Đặt các biến này trong Vercel → Environment Variables
const AFFILIATE_ID = process.env.NEXT_PUBLIC_AFFILIATE_ID || "YOUR_AFFILIATE_ID";
const SUB_ID       = process.env.NEXT_PUBLIC_SUB_ID       || "1-2-3-4-5";
// ====================

const STEPS = [
  {
    n: 1,
    bold: "Copy link sản phẩm",
    text: ' cần mua từ Shopee → Dán vào ô phía trên → Nhấn "Chuyển đổi ngay".',
  },
  {
    n: 2,
    bold: null,
    text: 'Nhấn "Mua ngay" để mở Shopee và đặt hàng với voucher mới được nhận.',
  },
];

const LOADING_STEPS = [
  "Đang kết nối Shopee Affiliate...",
  "Đang lấy voucher...",
  "Đang gắn mã FB...",
];

// Strip query params, chỉ lấy origin + path
function cleanShopeeUrl(shopeeUrl) {
  try {
    const u = new URL(shopeeUrl);
    return u.origin + u.pathname;
  } catch {
    return shopeeUrl.split("?")[0];
  }
}

// Build affiliate link theo document Shopee (phần A)
function buildAffiliateLink(cleanUrl, affiliateId, subId, fbclid) {
  const encoded = encodeURIComponent(cleanUrl);
  let link = `https://s.shopee.vn/an_redir?origin_link=${encoded}&affiliate_id=${affiliateId}&sub_id=${subId}`;
  if (fbclid) link += `&fbclid=${fbclid}`;
  return link;
}

// Detect loại input
function detectInputType(url) {
  if (url.includes("s.shopee.vn/an_redir") || url.includes("shope.ee/an_redir")) return "an_redir";
  if (/s\.shopee\.(vn|sg|ph|com|co\.id)\/[a-zA-Z0-9]+$/.test(url.split("?")[0])) return "shortlink";
  if (url.includes("shopee.vn") || url.includes("shopee.")) return "original";
  return "unknown";
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [fbclid, setFbclid] = useState("");
  const inputRef = useRef(null);
  const loadingTimer = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fb = params.get("fbclid");
    if (fb) setFbclid(fb);
  }, []);

  useEffect(() => {
    if (loading) {
      setLoadingStep(0);
      let i = 0;
      loadingTimer.current = setInterval(() => {
        i = (i + 1) % LOADING_STEPS.length;
        setLoadingStep(i);
      }, 700);
    } else {
      clearInterval(loadingTimer.current);
    }
    return () => clearInterval(loadingTimer.current);
  }, [loading]);

  async function handleConvert() {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Vui lòng dán link Shopee vào ô trên.");
      return;
    }
    if (!trimmed.includes("shopee.vn") && !trimmed.includes("shope.ee")) {
      setError("Không phải link Shopee hợp lệ.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    const type = detectInputType(trimmed);

    if (type === "unknown") {
      setError("Không phải link Shopee hợp lệ.");
      setLoading(false);
      return;
    }

    // Short link → cần unshorten qua server trước
    if (type === "shortlink") {
      try {
        const res = await fetch("/api/unshorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: trimmed }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Không thể resolve link");
        const finalLink = buildAffiliateLink(data.resolvedUrl, AFFILIATE_ID, SUB_ID, fbclid);
        setResult({ shortLink: finalLink });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    // an_redir đã có aff_id → extract origin_link, rebuild
    if (type === "an_redir") {
      try {
        const params = new URL(trimmed).searchParams;
        const originLink = params.get("origin_link");
        if (!originLink) throw new Error("Không tìm thấy origin_link");
        const clean = cleanShopeeUrl(decodeURIComponent(originLink));
        const finalLink = buildAffiliateLink(clean, AFFILIATE_ID, SUB_ID, fbclid);
        setResult({ shortLink: finalLink });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Link gốc Shopee → build trực tiếp
    setTimeout(() => {
      const clean = cleanShopeeUrl(trimmed);
      const finalLink = buildAffiliateLink(clean, AFFILIATE_ID, SUB_ID, fbclid);
      setResult({ shortLink: finalLink });
      setLoading(false);
    }, 1100);
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      inputRef.current?.focus();
    } catch {
      inputRef.current?.focus();
    }
  }

  function handleBuy() {
    if (result) window.open(result.shortLink, "_blank", "noopener");
  }

  const hasFbclid = !!fbclid;

  return (
    <>
      <Head>
        <title>Đổi Link Shopee — Nhận Mã FB Độc Quyền</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Chuyển link Shopee thành link affiliate để nhận voucher Facebook giảm đến 25%" />
      </Head>

      <div className="page">
        {/* Header */}
        <header className="header">
          <span className="header-icon">🛍️</span>
          <div>
            <h1 className="header-title">Đổi Link Lấy Mã FB</h1>
            <p className="header-sub">Voucher độc quyền Facebook — giảm đến 25%</p>
          </div>
        </header>

        {/* FB status pill */}
        <div className={`fb-pill ${hasFbclid ? "fb-pill--ok" : "fb-pill--warn"}`}>
          {hasFbclid ? (
            <>✅ Link hợp lệ — voucher Facebook sẽ tự động vào ví khi mua</>
          ) : (
            <>⚠️ Vào link này từ bài đăng Facebook để nhận được mã giảm giá</>
          )}
        </div>

        {/* Social proof */}
        <div className="social-proof">
          🔥 Hôm nay đã có <strong>478+</strong> người dùng tool này
        </div>

        {/* Converter card */}
        <div className="card">
          <div className="input-row">
            <input
              id="shopee-url"
              ref={inputRef}
              className="input"
              type="url"
              placeholder="Dán link sản phẩm Shopee vào đây..."
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(""); setResult(null); }}
              onKeyDown={(e) => e.key === "Enter" && handleConvert()}
            />
            <button className="paste-btn" onClick={handlePaste} title="Dán từ clipboard">
              📋
            </button>
          </div>

          {error && <p className="error-msg">⚠️ {error}</p>}

          <button
            className={`convert-btn ${loading ? "convert-btn--loading" : ""}`}
            onClick={handleConvert}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-wrap">
                <span className="spinner" />
                {LOADING_STEPS[loadingStep]}
              </span>
            ) : (
              "CHUYỂN ĐỔI NGAY"
            )}
          </button>
        </div>

        {/* Result card */}
        {result && (
          <div className="card result-card">
            <div className="result-product">
              <div className="result-check">✓</div>
              <div className="result-info">
                <p className="result-done">Đã chuyển đổi xong</p>
                <p className="result-voucher">🎉 Voucher FB đã sẵn sàng trong ví</p>
              </div>
            </div>
            <button className="buy-btn" onClick={handleBuy}>
              MUA NGAY
            </button>
          </div>
        )}

        {/* Steps card */}
        <div className="card steps-card">
          <div className="steps-header">
            <span>👉 <strong>Hướng dẫn áp mã</strong></span>
            <span className="steps-sub">Chỉ 2 bước đơn giản</span>
          </div>
          <div className="steps-list">
            {STEPS.map((s) => (
              <div key={s.n} className="step">
                <span className="step-num">{s.n}</span>
                <p className="step-text">
                  {s.bold && <strong>{s.bold}</strong>}
                  {s.text}
                </p>
              </div>
            ))}
          </div>
          <div className="warning-box">
            ⚠️ <strong>Lưu ý:</strong> Nếu không thấy mã là do sản phẩm bị lọc.{" "}
            <strong>MÃ CÓ LẠI LÚC 0H MỖI NGÀY</strong>.
          </div>
        </div>

        <footer className="footer">
          Link affiliate hợp lệ — voucher Facebook độc quyền
        </footer>
      </div>

      <style jsx>{`
        .page {
          max-width: 480px;
          margin: 0 auto;
          padding: 0 0 48px;
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--shopee);
          color: white;
          padding: 20px 20px 18px;
        }
        .header-icon { font-size: 32px; line-height: 1; }
        .header-title {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.3px;
          line-height: 1.2;
        }
        .header-sub { font-size: 12px; opacity: 0.85; margin-top: 2px; }

        /* FB pill */
        .fb-pill {
          margin: 12px 16px 0;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
        }
        .fb-pill--ok { background: #E8F5E9; color: #1B5E20; border: 1px solid #A5D6A7; }
        .fb-pill--warn { background: #FFF8E1; color: #6D4C00; border: 1px solid #FFD54F; }

        /* Social proof */
        .social-proof {
          margin: 8px 16px 0;
          padding: 9px 14px;
          background: #FFF3E0;
          border-radius: 8px;
          font-size: 13px;
          color: #BF360C;
          border: 1px solid #FFCC80;
        }

        /* Cards */
        .card {
          background: var(--white);
          border-radius: 16px;
          margin: 12px 16px 0;
          padding: 16px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
        }

        /* Input */
        .input-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .input {
          flex: 1;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 13px 14px;
          font-size: 15px;
          color: var(--text);
          outline: none;
          transition: border-color 0.15s;
          min-width: 0;
        }
        .input:focus { border-color: var(--shopee); }
        .input::placeholder { color: #BDBDBD; }
        .paste-btn {
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 0 14px;
          font-size: 18px;
          cursor: pointer;
          flex-shrink: 0;
        }
        .paste-btn:active { background: var(--border); }

        .error-msg {
          color: #C0392B;
          font-size: 13px;
          margin-bottom: 10px;
        }

        /* Convert button */
        .convert-btn {
          width: 100%;
          background: var(--shopee);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          min-height: 54px;
        }
        .convert-btn:hover:not(:disabled) { background: var(--shopee-dark); }
        .convert-btn:active:not(:disabled) { transform: scale(0.98); }
        .convert-btn--loading { opacity: 0.85; cursor: not-allowed; }
        .spinner-wrap { display: flex; align-items: center; justify-content: center; gap: 10px; }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Result */
        .result-card { border: 2px solid #A5D6A7; }
        .result-product {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border);
        }
        .result-check {
          width: 44px;
          height: 44px;
          background: var(--success);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .result-done {
          font-size: 15px;
          font-weight: 700;
          color: var(--success);
          margin-bottom: 3px;
        }
        .result-voucher {
          font-size: 13px;
          color: var(--muted);
        }
        .buy-btn {
          width: 100%;
          background: var(--shopee);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: 0.5px;
        }
        .buy-btn:hover { background: var(--shopee-dark); }
        .buy-btn:active { transform: scale(0.98); }

        /* Steps */
        .steps-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .steps-sub { font-size: 12px; color: var(--muted); }
        .steps-list { display: flex; flex-direction: column; gap: 8px; }
        .step {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: var(--bg);
          border-radius: 10px;
          padding: 12px 14px;
        }
        .step-num {
          background: var(--shopee);
          color: white;
          font-size: 13px;
          font-weight: 800;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .step-text { font-size: 14px; line-height: 1.55; color: var(--text); }

        .warning-box {
          margin-top: 10px;
          background: #FFF8E1;
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 13px;
          color: #6D4C00;
          line-height: 1.5;
        }

        /* Footer */
        .footer {
          text-align: center;
          font-size: 12px;
          color: var(--muted);
          padding-top: 16px;
        }
      `}</style>
    </>
  );
}
