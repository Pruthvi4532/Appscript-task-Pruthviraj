'use client';

import ProductListing from './components/ProductListing';
import './globals.css';
import { useEffect, useState } from 'react';

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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://fakestoreapi.com/products');
        const allProducts: Product[] = await res.json();

        // Filter products based on URL params
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category') || 'all';
        const sortParam = urlParams.get('sort') || 'featured';
        
        setCategory(categoryParam);
        setSort(sortParam);

        const filteredProducts = categoryParam === 'all' 
          ? allProducts 
          : allProducts.filter(product => product.category === categoryParam);

        // Sort products
        const sortedProducts = [...filteredProducts].sort((a, b) => {
          switch (sortParam) {
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

        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              "itemListElement": products.slice(0, 12).map((product, index) => ({
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
      
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '1.2rem'
        }}>
          Loading products...
        </div>
      ) : (
        <ProductListing 
          products={products}
          category={category}
          sort={sort}
        />
      )}
    </>
  );
}
