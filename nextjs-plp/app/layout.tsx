import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Listing Page | Appscrip Task',
  description: 'SSR product listing page with filters, sorting, responsive grid and SEO optimization.',
  keywords: 'product listing, e-commerce, responsive, seo, next.js',
  authors: [{ name: 'Pruthviraj' }],
  openGraph: {
    title: 'Product Listing Page | Appscrip Task',
    description: 'SSR PLP with responsive design and SEO optimization',
    type: 'website',
    url: 'https://appscrip-task-pruthviraj.vercel.app',
    images: [
      {
        url: 'https://appscrip-task-pruthviraj.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Appscrip Product Listing Page'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@pruthviraj'
  },
  robots: {
    index: true,
    follow: true
  },
  viewport: {
    width: 'device-width',
    initialScale: 1
  }
};

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
        <title>{metadata.title?.toString()}</title>
        <meta name="description" content={metadata.description?.toString()} />
        <meta name="keywords" content={metadata.keywords?.toString()} />
        <meta name="author" content={metadata.authors?.map(author => author.name).join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metadata.openGraph?.title} />
        <meta property="og:description" content={metadata.openGraph?.description} />
        <meta property="og:type" content={metadata.openGraph?.type} />
        <meta property="og:url" content={metadata.openGraph?.url} />
        <meta property="og:image" content={metadata.openGraph?.images?.[0]?.url} />
        <meta property="og:image:width" content={metadata.openGraph?.images?.[0]?.width} />
        <meta property="og:image:height" content={metadata.openGraph?.images?.[0]?.height} />
        <meta property="og:image:alt" content={metadata.openGraph?.images?.[0]?.alt} />
        
        {/* Twitter */}
        <meta name="twitter:card" content={metadata.twitter?.card} />
        <meta name="twitter:creator" content={metadata.twitter?.creator} />
        <meta name="twitter:image" content={metadata.openGraph?.images?.[0]?.url} />
        
        {/* Robots */}
        <meta name="robots" content={metadata.robots?.index ? 'index, follow' : 'noindex, nofollow'} />
        
        {/* Viewport */}
        <meta name="viewport" content={metadata.viewport?.width} />
        
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
