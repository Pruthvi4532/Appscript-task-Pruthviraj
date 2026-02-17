import { Product } from "./types";

export function buildPlpJsonLd(products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Product Listing Page",
    description: "Browse products with filters and sorting. SSR rendered for SEO.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.slice(0, 12).map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://example.com/?product=${p.id}`,
        name: p.title
      }))
    }
  };
}
