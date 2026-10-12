import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TOSCH — Meta Ads for Shopee</title>
        <meta name="description" content="Paid Meta traffic and affiliate campaigns that bring shoppers to leading brands on Shopee." />
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
        </header>
        <main id="top">
          <section className="hero wrap">
            <div>
              <div className="eyebrow">Paid social for Shopee brands</div>
              <h1>Make Meta traffic<br />count on <em>Shopee.</em></h1>
              <p className="lead">We run paid affiliate campaigns on Facebook and Instagram that bring the right shoppers to your products on Shopee.</p>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit"><div className="center">META<br />→ SHOPEE</div>
                <div className="bubble b1"><i />Paid reach</div><div className="bubble b2">Creative that sells</div><div className="bubble b3">Shopee orders ↗</div>
              </div>
            </div>
          </section>
          <section className="proof"><div className="wrap proof-inner"><div className="proof-label">Campaign experience across leading brands</div><div className="brands"><span>adidas</span><span>PUMA</span><span>NEW BALANCE</span><span className="cool">coolmate</span></div></div></section>
          <section className="section wrap">
            <div className="section-top"><div><div className="eyebrow">What we do</div><h2>From social scroll<br />to Shopee shop.</h2></div><p>We pair paid Meta distribution with affiliate content built around the product, the shopper, and the reason to buy.</p></div>
            <div className="cards">
              <article className="card"><div className="num">01 / REACH</div><h3>Meta paid traffic</h3><p>Facebook and Instagram campaigns designed to reach people likely to care about the product.</p></article>
              <article className="card"><div className="num">02 / CREATIVE</div><h3>Content with a reason</h3><p>Product and brand stories that make the value clear before shoppers tap through.</p></article>
              <article className="card"><div className="num">03 / ACTION</div><h3>Direct to Shopee</h3><p>Every campaign sends interested shoppers straight to the relevant Shopee listing.</p></article>
            </div>
          </section>
          <section className="wrap"><div className="statement"><h2>More relevant clicks.<br />More opportunity to sell.</h2><p>To improve promotional content and ads, we use Platform Data from our own Facebook Page and Instagram account, including post, comment, and ad performance. Clients do not receive or directly access that data.</p></div></section>
        </main>
        <footer className="footer wrap"><div className="footbrand">tosch.</div><p>Independent affiliate marketing service. Brand names are shown as examples of campaign experience; no endorsement or affiliation is implied. Shopee and Meta are trademarks of their respective owners.</p></footer>
      </div>
      <style jsx global>{`
        :root{--ink:#171916;--muted:#686b64;--paper:#f5f3ee;--lime:#d8fc58;--line:#d9d8d0;--white:#fffefa}
        *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased}.wrap{max-width:1180px;margin:auto;padding-left:34px;padding-right:34px}.site{min-height:100vh}.nav{height:82px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line)}.logo{font:800 25px Manrope,sans-serif;letter-spacing:-1.4px;text-decoration:none;color:var(--ink)}.logo span{color:#798d22}.nav-note{font-size:12px;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}
        .hero{display:grid;grid-template-columns:1.2fr .8fr;gap:70px;align-items:center;padding-top:94px;padding-bottom:88px;min-height:555px}.eyebrow{font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:#657828;display:flex;gap:10px;align-items:center}.eyebrow:before{content:'';width:24px;height:2px;background:#8ea72d}h1{font:700 clamp(50px,7vw,88px)/.98 Manrope,sans-serif;letter-spacing:-.075em;margin:24px 0 22px}h1 em{font-style:normal;color:#768b27}.lead{font-size:18px;line-height:1.65;color:#55594f;max-width:540px;margin:0}.hero-art{position:relative;min-height:340px;display:grid;place-items:center}.orbit{width:300px;height:300px;border:1px solid #d1d0c7;border-radius:50%;display:grid;place-items:center;position:relative}.orbit:before,.orbit:after{content:'';position:absolute;border:1px solid #d1d0c7;border-radius:50%}.orbit:before{inset:28px}.orbit:after{inset:58px}.center{position:relative;z-index:1;width:130px;height:130px;border-radius:32px;background:var(--lime);display:grid;place-items:center;text-align:center;font:800 22px/1.1 Manrope;letter-spacing:-1px;transform:rotate(-8deg);box-shadow:0 14px 35px #30351b20}.bubble{position:absolute;z-index:2;background:var(--white);border:1px solid var(--line);border-radius:14px;padding:14px 17px;font-weight:700;font-size:13px;box-shadow:0 8px 24px #20231b0d;white-space:nowrap}.bubble i{width:8px;height:8px;display:inline-block;background:#8ea72d;border-radius:50%;margin-right:8px}.b1{top:30px;right:-5px}.b2{left:-12px;top:125px}.b3{right:8px;bottom:27px}
        .proof{background:var(--ink);color:white;padding:27px 0}.proof-inner{display:flex;justify-content:space-between;align-items:center;gap:30px}.proof-label{font-size:11px;text-transform:uppercase;letter-spacing:.16em;color:#b8b9b0;white-space:nowrap}.brands{display:flex;align-items:center;justify-content:flex-end;gap:clamp(22px,5vw,62px);flex-wrap:wrap}.brands span{font:800 clamp(15px,2vw,21px) Manrope;letter-spacing:-.04em}.brands .cool{font-weight:600;letter-spacing:-.06em}
        .section{padding-top:98px;padding-bottom:96px}.section-top{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:end;margin-bottom:43px}.section h2{font:700 clamp(34px,4.5vw,54px)/1.04 Manrope;letter-spacing:-.065em;margin:16px 0 0}.section-top p{color:var(--muted);line-height:1.7;margin:0;max-width:450px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.card{background:var(--white);border:1px solid var(--line);border-radius:20px;padding:28px;min-height:205px}.num{font:700 12px Manrope;color:#7c8f32;letter-spacing:.1em}.card h3{font:700 21px Manrope;letter-spacing:-.04em;margin:30px 0 10px}.card p{font-size:14px;line-height:1.65;color:var(--muted);margin:0}.statement{background:var(--lime);border-radius:24px;padding:44px 48px;display:flex;align-items:center;justify-content:space-between;gap:35px;margin-bottom:96px}.statement h2{font:700 clamp(28px,4vw,44px)/1.06 Manrope;letter-spacing:-.06em;margin:0;max-width:600px}.statement p{max-width:350px;color:#454a37;line-height:1.6;margin:0;font-size:14px}.footer{border-top:1px solid var(--line);padding-top:24px;padding-bottom:30px;display:flex;justify-content:space-between;gap:20px;color:#77796f;font-size:11px;line-height:1.5}.footbrand{font:800 18px Manrope;color:var(--ink);letter-spacing:-1px}.footer p{max-width:620px;text-align:right;margin:0}
        @media(max-width:760px){.wrap{padding-left:21px;padding-right:21px}.nav{height:68px}.nav-note{font-size:10px}.hero{grid-template-columns:1fr;gap:28px;padding-top:72px;padding-bottom:63px;min-height:auto}.hero-art{min-height:290px;transform:scale(.88)}.orbit{width:275px;height:275px}.proof-inner{align-items:flex-start;flex-direction:column}.brands{justify-content:flex-start;gap:22px}.section{padding-top:70px;padding-bottom:70px}.section-top{grid-template-columns:1fr;gap:18px}.cards{grid-template-columns:1fr}.card{min-height:auto}.card h3{margin-top:20px}.statement{display:block;padding:30px;margin-bottom:65px}.statement p{margin-top:17px}.footer{flex-direction:column}.footer p{text-align:left}}
      `}</style>
    </>
  );
}
