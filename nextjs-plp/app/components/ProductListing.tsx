'use client';

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

interface ProductListingProps {
  products: Product[];
  category: string;
  sort: string;
}

export default function ProductListing({ products, category, sort }: ProductListingProps) {
  const toINR = (usd: number) => {
    const inr = Math.round(usd * 83);
    return `₹ ${inr.toLocaleString('en-IN')}`;
  };

  const handleCategoryChange = (newCategory: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', newCategory);
    url.searchParams.set('sort', sort);
    window.location.href = url.toString();
  };

  const handleSortChange = (newSort: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('category', category);
    url.searchParams.set('sort', newSort);
    window.location.href = url.toString();
  };

  return (
    <>
      <div className="container">
        <header className="site-header">
          <div className="header-row">
            <div className="brand" aria-label="Brand">
              <div className="brand-logo">
                A
              </div>
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
              Static PLP with filters, sorting, responsive grid and clean SEO.
            </p>
          </section>

          <section className="plp-toolbar">
            <div className="filters">
              <button 
                className={`chip ${category === 'all' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('all')}
              >
                All
              </button>
              <button 
                className={`chip ${category === 'electronics' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('electronics')}
              >
                Electronics
              </button>
              <button 
                className={`chip ${category === 'jewelery' ? 'active' : ''}`}
                onClick={() => handleCategoryChange('jewelery')}
              >
                Jewelery
              </button>
              <button 
                className={`chip ${category === "men's clothing" ? 'active' : ''}`}
                onClick={() => handleCategoryChange("men's clothing")}
              >
                Men
              </button>
              <button 
                className={`chip ${category === "women's clothing" ? 'active' : ''}`}
                onClick={() => handleCategoryChange("women's clothing")}
              >
                Women
              </button>
            </div>

            <select 
              className="sort-select"
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </section>

          <section className="product-grid">
            {products.map((product) => (
              <a 
                key={product.id} 
                href={`/product/${product.id}`}
                className="product-card"
              >
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="product-image"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik04NSA3NUgxMTVWMTA1SDg1Vjc1WiIgZmlsbD0iI0QxRDVEQiIvPgo8L3N2Zz4K';
                  }}
                />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{toINR(product.price)}</span>
                    <div className="product-rating">
                      <span>⭐</span>
                      <span>{product.rating.rate}</span>
                      <span>({product.rating.count})</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </section>
        </main>

        <footer className="site-footer">
          <div className="footer-row">
            <p>© 2026 Appscrip Store • Built by Pruthviraj</p>
          </div>
        </footer>
      </div>
    </>
  );
}
