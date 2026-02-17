import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Listing Page | Appscrip Task",
  description: "SSR product listing page with filters, sorting, responsive grid and SEO schema.",
  openGraph: {
    title: "Product Listing Page | Appscrip Task",
    description: "SSR PLP with responsive layout and SEO-first implementation.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skipLink" href="#main">Skip to content</a>

        <header className="header">
          <div className="container headerRow">
            <div className="brand" aria-label="Brand">
              <span className="brandMark" aria-hidden="true">◎</span>
              <span className="brandName">Appscrip Store</span>
            </div>

            <nav className="nav" aria-label="Primary navigation">
              <a className="navLink" href="/">Shop</a>
              <a className="navLink" href="/">New</a>
              <a className="navLink" href="/">About</a>
            </nav>
          </div>
        </header>

        <div id="main">{children}</div>

        <footer className="footer">
          <div className="container footerRow">
            <p>© 2026 • Built by Pruthviraj</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
