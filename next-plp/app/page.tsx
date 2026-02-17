import FiltersBar from "@/components/FiltersBar";
import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { buildPlpJsonLd } from "@/lib/seo";
import { Product } from "@/lib/types";

type SearchParams = {
  category?: string;
  sort?: string;
};

function sortProducts(products: Product[], sort: string) {
  const copy = [...products];

  if (sort === "price_asc") return copy.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") return copy.sort((a, b) => b.price - a.price);
  if (sort === "rating_desc")
    return copy.sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));

  return copy; // featured = default order
}

export default async function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { category = "all", sort = "featured" } = await searchParams;

  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

  const filtered =
    category === "all" ? products : products.filter((p) => p.category === category);

  const sorted = sortProducts(filtered, sort);

  const jsonLd = buildPlpJsonLd(sorted);

  return (
    <main className="container">
      <section className="hero">
        <h1 className="title">Discover Products</h1>
        <p className="subtitle">
          Server-rendered PLP with filters, sorting, responsive grid, and clean SEO.
        </p>
      </section>

      <section className="toolbar" aria-label="Filters and sorting">
        <FiltersBar categories={categories} activeCategory={category} />
        <div className="toolbarRight">
          <SortSelect value={sort} />
          {/* Sort links keep SSR + minimal JS */}
          <div className="sortLinks" aria-label="Sort links">
            <a className="link" href={`/?category=${encodeURIComponent(category)}&sort=featured`}>Featured</a>
            <a className="link" href={`/?category=${encodeURIComponent(category)}&sort=price_asc`}>₹ Low</a>
            <a className="link" href={`/?category=${encodeURIComponent(category)}&sort=price_desc`}>₹ High</a>
            <a className="link" href={`/?category=${encodeURIComponent(category)}&sort=rating_desc`}>Rating</a>
          </div>
        </div>
      </section>

      <section className="grid" aria-label="Product grid">
        <h2 className="srOnly">Product results</h2>
        {sorted.slice(0, 16).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
