export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Product Listing Page | Appscrip Task</title>
        <meta name="description" content="SSR product listing page with filters, sorting, responsive grid and SEO optimization." />
        <meta name="keywords" content="product listing, e-commerce, responsive, seo, next.js" />
        <meta name="author" content="Pruthviraj" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Product Listing Page | Appscrip Task" />
        <meta property="og:description" content="SSR PLP with responsive design and SEO optimization" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://appscrip-task-pruthviraj.vercel.app" />
        <meta property="og:image" content="https://appscrip-task-pruthviraj.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Appscrip Product Listing Page" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@pruthviraj" />
        <meta name="twitter:image" content="https://appscrip-task-pruthviraj.vercel.app/og-image.jpg" />
        
        {/* Robots */}
        <meta name="robots" content="index, follow" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        
        <header className="site-header">
          <div className="container header-row">
            <div className="brand" aria-label="Brand">
              <div className="brand-logo">
                A
              </div>
              <span className="brand-name">Appscrip Store</span>
            </div>

            <nav className="nav" aria-label="Primary navigation">
              <a href="#shop">Shop</a>
              <a href="#new">New</a>
              <a href="#about">About</a>
            </nav>
          </div>
        </header>

        <main id="main">
          {children}
        </main>

        <footer className="site-footer">
          <div className="container footer-row">
            <p>© 2026 Appscrip Store • Built by Pruthviraj</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
