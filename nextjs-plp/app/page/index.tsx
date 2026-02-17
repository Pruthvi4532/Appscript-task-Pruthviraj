import { GetServerSideProps } from 'next';
import Head from 'next/head';

export const getServerSideProps = async ({ query }) => {
  // Fetch products from FakeStore API
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();

  // Filter products based on query params
  const category = query.category || 'all';
  const sort = query.sort || 'featured';
  
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      default:
        return 0; // featured
    }
  });

  return {
    props: {
      products: sortedProducts,
      category,
      sort
    }
  };
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface HomePageProps {
  products: Product[];
  category: string;
  sort: string;
}

export default function HomePage({ products, category, sort }: HomePageProps) {
  const toINR = (usd: number) => {
    const inr = Math.round(usd * 83);
    return `₹ ${inr.toLocaleString('en-IN')}`;
  };

  return (
    <>
      <Head>
        <title>Product Listing Page | Appscrip Task</title>
        <meta name="description" content="Browse {category} products sorted by {sort}. Find the best deals on quality products." />
        <meta name="keywords" content="product listing, e-commerce, responsive, seo, next.js" />
        <meta property="og:title" content="Product Listing Page | Appscrip Task" />
        <meta property="og:description" content="Browse {category} products sorted by {sort}. Find the best deals on quality products." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Product Listing Page",
            "description": `Browse ${category} products sorted by ${sort}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": products.slice(0, 12).map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://appscrip-task-pruthviraj.vercel.app/product/${product.id}`,
                "name": product.title,
                "image": product.image
              }))
            }
          })}
        </script>
      </Head>

      <div className="container">
        <header className="site-header">
          <div className="header-row">
            <div className="brand" aria-label="Brand">
              <div className="brand-logo">A</div>
              <span className="brand-name">Appscrip Store</span>
            </div>

            <nav className="nav">
              <a href="#shop">Shop</a>
              <a href="#new">New</a>
              <a href="#about">About</a>
            </nav>
          </div>
        </header>

        <main id="main">
          <section className="plp-hero">
            <h1 className="plp-title">Discover Products</h1>
            <p className="plp-subtitle">
              Server-rendered PLP with filters, sorting, responsive grid and clean SEO.
            </p>
          </section>

          <section className="plp-toolbar">
            <div className="filters">
              <button 
                className={`chip ${category === 'all' ? 'active' : ''}`}
                onClick={() => window.location.href = '/?category=all'}
              >
                All
              </button>
              <button 
                className={`chip ${category === 'electronics' ? 'active' : ''}`}
                onClick={() => window.location.href = '/?category=electronics'}
              >
                Electronics
              </button>
              <button 
                className={`chip ${category === 'jewelery' ? 'active' : ''}`}
                onClick={() => window.location.href = '/?category=jewelery'}
              >
                Jewelery
              </button>
              <button 
                className={`chip ${category === 'men\'s clothing' ? 'active' : ''}`}
                onClick={() => window.location.href = '/?category=men\'s clothing'}
              >
                Men
              </button>
              <button 
                className={`chip ${category === 'women\'s clothing' ? 'active' : ''}`}
                onClick={() => window.location.href = '/?category=women\'s clothing'}
              >
                Women
              </button>
            </div>

            <div className="sort">
              <label htmlFor="sortSelect" className="sort-label">Sort</label>
              <select 
                id="sortSelect" 
                className="sort-select"
                value={sort}
                onChange={(e) => window.location.href = `/?category=${category}&sort=${e.target.value}`}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating</option>
              </select>
            </div>
          </section>

          <section className="plp-grid" aria-label="Product grid">
            <h2 className="sr-only">Product results</h2>
            {products.map((product) => (
              <article key={product.id} className="card">
                <img 
                  src={product.image} 
                  alt={`${product.title} - ${product.category}`}
                  className="card-img"
                  onError={(e) => { e.target.src = '/placeholder-product.webp'; }}
                />
                <div className="card-body">
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-meta">
                    {product.category} • ★ {product.rating?.rate || 0}
                  </p>
                  <div className="card-row">
                    <span className="price">{toINR(product.price)}</span>
                    <button className="btn" type="button">Add</button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <nav className="pagination" aria-label="Pagination">
            <button className="page-btn" onClick={() => window.location.href = '/?page=1'}>Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn" onClick={() => window.location.href = '/?page=2'}>2</button>
            <button className="page-btn" onClick={() => window.location.href = '/?page=3'}>3</button>
            <button className="page-btn" onClick={() => window.location.href = '/?page=4'}>Next</button>
          </nav>
        </main>

        <footer className="site-footer">
          <div className="container footer-row">
            <p>© 2026 Appscrip Store • Built by Pruthviraj</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        :root {
          --primary-color: #2563eb;
          --secondary-color: #64748b;
          --accent-color: #f59e0b;
          --background: #ffffff;
          --text-primary: #1a1a1a;
          --text-secondary: #6b7280;
          --text-muted: #9ca3af;
          --border-color: #e5e7eb;
          --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          --radius: 8px;
          --container: 1200px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background-color: var(--background);
        }

        body {
          min-height: 100vh;
        }

        .container {
          max-width: var(--container);
          margin: 0 auto;
          padding: 0 20px;
        }

        .skip-link {
          position: absolute;
          left: -9999px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        .skip-link:focus {
          left: 16px;
          top: 16px;
          width: auto;
          height: auto;
          padding: 10px 12px;
          background: var(--primary-color);
          color: var(--background);
          border-radius: var(--radius);
          z-index: 1000;
        }

        .site-header {
          background: var(--background);
          border-bottom: 1px solid var(--border-color);
          box-shadow: var(--shadow);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 18px;
          color: var(--primary-color);
        }

        .brand-logo {
          width: 40px;
          height: 40px;
          border-radius: var(--radius);
          background: var(--primary-color);
          color: var(--background);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 20px;
        }

        .brand-name {
          font-size: 20px;
          font-weight: 800;
        }

        .nav {
          display: flex;
          gap: 24px;
        }

        .nav a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: var(--radius);
          transition: var(--transition);
        }

        .nav a:hover {
          color: var(--text-primary);
          background-color: var(--accent-color);
        }

        .plp-hero {
          padding: 40px 0;
          text-align: center;
        }

        .plp-title {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 800;
          margin-bottom: 16px;
          color: var(--primary-color);
        }

        .plp-subtitle {
          font-size: 18px;
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
        }

        .plp-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid var(--border-color);
          flex-wrap: wrap;
        }

        .filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .chip {
          background: var(--background);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 12px 20px;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          font-size: 14px;
        }

        .chip:hover {
          background-color: var(--accent-color);
          color: var(--text-primary);
        }

        .chip.active {
          background-color: var(--primary-color);
          color: var(--background);
        }

        .sort {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sort-label {
          font-weight: 600;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .sort-select {
          background: var(--background);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 12px 16px;
          border-radius: var(--radius);
          font-size: 14px;
          cursor: pointer;
          transition: var(--transition);
        }

        .plp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          padding: 32px 0;
        }

        .card {
          background: var(--background);
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          overflow: hidden;
          transition: var(--transition);
          box-shadow: var(--shadow);
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          background-color: var(--text-muted);
        }

        .card-body {
          padding: 20px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
          line-height: 1.4;
        }

        .card-meta {
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .card-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .price {
          font-size: 20px;
          font-weight: 800;
          color: var(--primary-color);
        }

        .btn {
          background: var(--primary-color);
          color: var(--background);
          border: none;
          padding: 12px 24px;
          border-radius: var(--radius);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          font-size: 14px;
        }

        .btn:hover {
          background-color: var(--accent-color);
          transform: translateY(-2px);
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 32px 0;
        }

        .page-btn {
          background: var(--background);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 12px 16px;
          border-radius: var(--radius);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
          font-size: 14px;
        }

        .page-btn:hover {
          background-color: var(--accent-color);
          color: var(--text-primary);
        }

        .page-btn.active {
          background-color: var(--primary-color);
          color: var(--background);
        }

        .site-footer {
          background: var(--background);
          border-top: 1px solid var(--border-color);
          padding: 24px 0;
          text-align: center;
        }

        .footer-row {
          color: var(--text-muted);
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .plp-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .filters {
            order: 2;
          }

          .sort {
            order: 1;
            align-self: flex-start;
          }

          .plp-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            padding: 24px 0;
          }

          .nav {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .plp-grid {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 16px 0;
          }

          .header-row {
            padding: 12px 0;
          }

          .brand-name {
            font-size: 16px;
          }

          .filters {
            gap: 8px;
          }

          .chip {
            padding: 10px 16px;
            font-size: 12px;
          }
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
        }
      `}</style>
    </>
  );
}
