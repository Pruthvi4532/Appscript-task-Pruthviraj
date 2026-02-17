import type { Metadata } from 'next';
import ProductListing from './components/ProductListing';
import fetchProductsFromAPI from '../lib/mockApi';

type SearchParams = { category?: string; sort?: string };

export async function generateMetadata({ searchParams }: { searchParams?: SearchParams }): Promise<Metadata> {
  const category = searchParams?.category ?? 'all';
  const sort = searchParams?.sort ?? 'featured';
  
  return {
    title: 'Product Listing Page | Appscrip Task',
    description: `Browse ${category} products sorted by ${sort}. Find best deals on quality products.`,
    keywords: 'product listing, e-commerce, responsive, seo, next.js',
    openGraph: {
      title: 'Product Listing Page | Appscrip Task',
      description: `Browse ${category} products sorted by ${sort}. Find best deals on quality products.`,
      type: 'website',
    },
    robots: 'index, follow',
  };
}

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

export default async function HomePage({ searchParams }: { searchParams?: SearchParams }) {
  const category = searchParams?.category ?? 'all';
  const sort = searchParams?.sort ?? 'featured';

  // Use mock API with fallback to real API
  const products = await fetchProductsFromAPI();
  
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
        return (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0);
      default:
        return 0; // featured
    }
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Product Listing Page",
            "description": `Browse ${category} products sorted by ${sort}`,
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": sortedProducts.slice(0, 12).map((product, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `https://appscrip-task-pruthviraj.vercel.app/product/${product.id}`,
                "name": product.title,
                "image": product.image
              }))
            }
          })
        }}
      />

      <ProductListing products={sortedProducts} category={category} sort={sort} />
    </>
  );
}
