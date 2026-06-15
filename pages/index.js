import { useState, useEffect, useRef } from "react";
import Head from "next/head";

const STEPS = [
  {
    n: 1,
    bold: "Copy link sản phẩm",
    text: ' cần mua từ Shopee → Dán vào ô phía trên → Nhấn "Chuyển đổi ngay".',
  },
  {
    n: 2,
    bold: null,
    text: 'Nhấn "Mua ngay" để mở Shopee trong tab mới và đặt hàng với mã giảm giá đã áp dụng.',
  },
  {
    n: 3,
    bold: null,
    text: "Vào ví Shopee → chọn voucher Facebook độc quyền → áp dụng khi thanh toán.",
  },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null); // { shortLink, fbclid }
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fbclid, setFbclid] = useState("");
  const inputRef = useRef(null);

  // Grab fbclid from URL on mount — this is what makes voucher claimable
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fb = params.get("fbclid");
    if (fb) setFbclid(fb);
  }, []);

  async function handleConvert() {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Vui lòng dán link Shopee vào ô trên.");
      return;
    }
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Lỗi không xác định");

      // Append fbclid to shortLink so Shopee sees FB traffic
      let finalLink = data.shortLink;
      if (fbclid && !finalLink.includes("fbclid")) {
        finalLink += (finalLink.includes("?") ? "&" : "?") + "fbclid=" + fbclid;
      }
      setResult({ shortLink: finalLink });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  async function handleCopy() {
    if (!result) return;
    await navigator.clipboard.writeText(result.shortLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <>✅ Đã nhận diện traffic Facebook — bạn đủ điều kiện nhận mã</>
          ) : (
            <>⚠️ Không tìm thấy fbclid — vào link này từ bài đăng Facebook để nhận được mã</>
          )}
        </div>

        {/* Converter card */}
        <div className="card">
          <label className="label" htmlFor="shopee-url">
            Link sản phẩm Shopee
          </label>
          <div className="input-row">
            <input
              id="shopee-url"
              ref={inputRef}
              className="input"
              type="url"
              placeholder="Dán hoặc gõ link Shopee..."
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
              <span className="spinner-wrap"><span className="spinner" /> Đang xử lý...</span>
            ) : (
              "CHUYỂN ĐỔI NGAY"
            )}
          </button>
        </div>

        {/* Result card */}
        {result && (
          <div className="card result-card">
            <p className="result-label">✅ Link đã sẵn sàng</p>
            <div className="result-link-box">
              <span className="result-link-text">{result.shortLink}</span>
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? "✓" : "📋"}
              </button>
            </div>
            <button className="buy-btn" onClick={handleBuy}>
              🛒 MUA NGAY — Nhận mã Facebook
            </button>
            <p className="buy-note">Mã sẽ tự hiện trong ví Shopee sau khi mở link</p>
          </div>
        )}

        {/* Steps card */}
        <div className="card steps-card">
          <div className="steps-header">
            <span>👉 <strong>Hướng dẫn áp mã</strong></span>
            <span className="steps-sub">Chỉ 3 bước đơn giản</span>
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
          margin: 12px 16px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
        }
        .fb-pill--ok { background: #E8F5E9; color: #1B5E20; border: 1px solid #A5D6A7; }
        .fb-pill--warn { background: #FFF8E1; color: #6D4C00; border: 1px solid #FFD54F; }

        /* Cards */
        .card {
          background: var(--white);
          border-radius: 16px;
          margin: 0 16px 12px;
          padding: 20px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.07);
        }

        /* Input */
        .label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .input-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .input {
          flex: 1;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          padding: 12px 14px;
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
        }
        .convert-btn:hover:not(:disabled) { background: var(--shopee-dark); }
        .convert-btn:active:not(:disabled) { transform: scale(0.98); }
        .convert-btn--loading { opacity: 0.75; cursor: not-allowed; }
        .spinner-wrap { display: flex; align-items: center; justify-content: center; gap: 8px; }
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
        .result-label { font-size: 14px; font-weight: 700; color: var(--success); margin-bottom: 10px; }
        .result-link-box {
          display: flex;
          align-items: center;
          background: var(--bg);
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 14px;
          gap: 8px;
        }
        .result-link-text {
          flex: 1;
          font-size: 13px;
          color: var(--muted);
          word-break: break-all;
          line-height: 1.4;
        }
        .copy-btn {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          flex-shrink: 0;
          padding: 4px;
        }
        .buy-btn {
          width: 100%;
          background: var(--success);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 15px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: 0.3px;
        }
        .buy-btn:hover { background: #219150; }
        .buy-btn:active { transform: scale(0.98); }
        .buy-note { font-size: 12px; color: var(--muted); text-align: center; margin-top: 8px; }

        /* Steps */
        .steps-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 14px;
        }
        .steps-sub { font-size: 12px; color: var(--muted); }
        .steps-list { display: flex; flex-direction: column; gap: 10px; }
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
          margin-top: 14px;
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
          padding-top: 8px;
        }
      `}</style>
    </>
  );
}
