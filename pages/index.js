import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
        <title>TOSCH — Meta Ads for Shopee</title>
        <meta name="description" content="Paid affiliate campaigns on Meta that send shoppers to Shopee." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f5f3ee" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div className="site">
        <header className="nav wrap">
          <a className="logo" href="#top">tosch<span>.</span></a>
          <div className="nav-note">Shopee affiliate · Vietnam</div>
          <a className="nav-cta" href="#contact">Reach us <span>↗</span></a>
        </header>
        <main id="top">
          <section className="hero wrap">
            <div className="eyebrow"><i /> PAID AFFILIATE TRAFFIC FOR SHOPEE</div>
            <h1>We turn Meta ads<br />into <em>Shopee orders.</em></h1>
            <p className="lead">TOSCH runs paid affiliate campaigns on Facebook and Instagram to bring the right shoppers to your Shopee products.</p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">Reach us <span>↗</span></a>
              <a className="button secondary" href="mailto:tranhuutai885@gmail.com">Email TOSCH</a>
            </div>
            <div className="proof"><span className="proof-line" />Built for brands people already love</div>
          </section>
          <section className="brands wrap" aria-label="Brand examples">
            <div className="brand adidas">adidas</div><div className="brand puma">PUMA</div><div className="brand nb">new balance</div><div className="brand cool">coolmate</div>
            <p>Brand names shown as examples of campaigns. TOSCH is an independent affiliate marketing service and is not endorsed by these brands.</p>
          </section>
          <section className="approach wrap">
            <div className="section-kicker">THE TOSCH APPROACH</div>
            <div className="approach-card">
              <div className="spark">✳</div>
              <p><em>As a top-tier Shopee partner with 1+ year of proven results in Facebook paid ads at scale, we use AI, advanced creative frameworks, and deep platform data to find your real buyers. We optimize for one thing only: direct orders</em></p>
              <div className="approach-foot"><span>CREATIVE × MEDIA × PERFORMANCE</span><span>01 — 03</span></div>
            </div>
          </section>
          <section className="contact wrap" id="contact">
            <div className="contact-head"><div><div className="section-kicker">LET’S TALK</div><h2>Ready to reach<br /><em>more buyers?</em></h2></div><a className="button primary contact-button" href="tel:+84365637885">Reach us <span>↗</span></a></div>
            <div className="contact-grid">
              <a className="contact-item" href="tel:+84365637885"><span>PHONE / ZALO</span><strong>+84 365 637 885</strong><small>Call or message us</small></a>
              <a className="contact-item" href="mailto:tranhuutai885@gmail.com"><span>EMAIL</span><strong>tranhuutai885@gmail.com</strong><small>Send us an email</small></a>
              <div className="contact-item address"><span>ADDRESS</span><strong>Tầng 5, Tòa Nhà TTM BUILDING, Số 309 Bạch Đằng, Phường Gia Định, Hồ Chí Minh</strong></div>
              <div className="contact-item"><span>MÃ SỐ THUẾ</span><strong>0319230093</strong></div>
            </div>
          </section>
        </main>
        <footer className="footer wrap"><a className="logo" href="#top">tosch<span>.</span></a><span>Meta paid affiliate campaigns for Shopee</span><span>© {new Date().getFullYear()} TOSCH</span></footer>
      </div>
      <style jsx global>{
        `
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #f5f3ee; color: #20211e; font-family: 'DM Sans', sans-serif; }
        a { color: inherit; text-decoration: none; }
        .site { overflow: hidden; }
        .wrap { width: min(1120px, calc(100% - 64px)); margin: 0 auto; }
        .nav { height: 88px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid #deddd6; }
        .logo { font: 800 27px Manrope,sans-serif; letter-spacing:-1.8px; }.logo span { color:#fb6138; }
        .nav-note { color:#777970; font-size:13px; }.nav-cta { font-size:13px; font-weight:700; }.nav-cta span { color:#fb6138; padding-left:8px; }
        .hero { padding:112px 0 96px; }
        .eyebrow,.section-kicker { font-size:11px; letter-spacing:1.8px; font-weight:700; color:#777970; }.eyebrow { display:flex; align-items:center; gap:10px; }.eyebrow i { width:8px;height:8px;border-radius:50%;background:#fb6138; }
        h1,h2 { font:700 clamp(50px,8vw,94px)/1.02 Manrope,sans-serif; letter-spacing:-6px; margin:30px 0 22px; }.hero h1 em,h2 em { color:#fb6138; font-style:normal; }
        .lead { max-width:520px; font-size:18px; line-height:1.65; color:#676961; margin:0; }.hero-actions { display:flex; gap:12px; margin-top:32px; }
        .button { display:inline-flex; align-items:center; justify-content:center; gap:18px; min-height:52px; padding:0 21px; border-radius:6px; font-size:13px; font-weight:700; }.button span { font-size:17px; }.primary { color:#fff; background:#20211e; }.primary:hover { background:#fb6138; }.secondary { border:1px solid #d6d5ce; }
        .proof { display:flex; align-items:center; gap:12px; margin-top:62px; color:#777970; font-size:12px; }.proof-line { width:38px; height:1px; background:#fb6138; }
        .brands { border-top:1px solid #deddd6; border-bottom:1px solid #deddd6; padding:31px 0 25px; display:grid; grid-template-columns:repeat(4,1fr); align-items:center; gap:20px; }.brand { font:800 22px Manrope,sans-serif; letter-spacing:-1px; text-align:center; }.adidas { font-style:italic; }.puma { letter-spacing:2px; }.nb { font-size:17px; }.cool { font-size:21px; }.brands p { grid-column:1/-1; text-align:center; color:#92938c; font-size:10px; margin:10px 0 0; }
        .approach { padding:105px 0 110px; }.approach-card { margin-top:21px; padding:42px 48px 24px; background:#e9e7df; border-radius:8px; }.spark { font-size:27px; color:#fb6138; }.approach-card p { max-width:870px; font:500 clamp(23px,3.6vw,40px)/1.35 Manrope,sans-serif; letter-spacing:-1.3px; margin:24px 0 38px; }.approach-foot { padding-top:18px; border-top:1px solid #d4d2c9; display:flex; justify-content:space-between; color:#777970; font-size:10px; letter-spacing:1.3px; font-weight:700; }
        .contact { padding:0 0 104px; }.contact-head { display:flex; align-items:flex-end; justify-content:space-between; padding-bottom:36px; border-bottom:1px solid #deddd6; }.contact h2 { font-size:clamp(42px,6vw,68px); letter-spacing:-4px; margin:18px 0 0; }.contact-button { margin-bottom:8px; }
        .contact-grid { display:grid; grid-template-columns:1fr 1fr; }.contact-item { min-height:128px; padding:25px 20px 20px 0; border-bottom:1px solid #deddd6; display:flex; flex-direction:column; gap:9px; }.contact-item:nth-child(odd) { border-right:1px solid #deddd6; }.contact-item:nth-child(even) { padding-left:28px; }.contact-item > span { color:#85867e; font-size:10px; font-weight:700; letter-spacing:1.5px; }.contact-item strong { font:600 16px Manrope,sans-serif; }.contact-item small { color:#85867e; font-size:12px; }.address strong { max-width:470px; line-height:1.5; }
        .footer { border-top:1px solid #deddd6; height:90px; display:flex; align-items:center; justify-content:space-between; color:#85867e; font-size:11px; }.footer .logo { color:#20211e; font-size:22px; }
        @media(max-width:650px) { .wrap { width:calc(100% - 40px); }.nav { height:70px; }.nav-note { display:none; }.hero { padding:80px 0 65px; } h1 { letter-spacing:-3.5px; }.brands { grid-template-columns:1fr 1fr; padding-top:24px; }.approach { padding:75px 0; }.approach-card { padding:28px 23px 19px; }.approach-card p { letter-spacing:-.7px; }.contact-head { align-items:flex-start; flex-direction:column; gap:24px; }.contact-grid { grid-template-columns:1fr; }.contact-item:nth-child(odd) { border-right:0; }.contact-item:nth-child(even) { padding-left:0; }.footer { height:auto; min-height:90px; flex-wrap:wrap; gap:14px; padding:22px 0; }.footer span:nth-child(2) { display:none; } }
      `}</style>
    </>
  );
}
