// Mock API using FakeStore API data
// This provides reliable fallback data when external API fails

interface MockProduct {
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

// Mock data based on FakeStore API structure
const mockProducts: MockProduct[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYN_4_c.jpeg",
    rating: {
      rate: 3.9,
      count: 120
    }
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDL._AC_SY879._SX._UX._SY._UY._XX._ZZ._V1__SY886BH1O4o._SX679._UX479._SY396._UX761._SY445._UX328._QL65_FMwebp_.jpg",
    rating: {
      rate: 4.1,
      count: 259
    }
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or everyday wear. Solid color jackets are classic and timeless.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtUL._AC_UX679._SY615._QL65_FMwebp_.jpg",
    rating: {
      rate: 4.7,
      count: 500
    }
  },
  {
    id: 4,
    title: "Women's Handbag Cotton",
    price: 67.99,
    description: "Perfect for everyday use, this handbag features a spacious interior with multiple pockets and a stylish design that complements any outfit.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.5,
      count: 189
    }
  },
  {
    id: 5,
    title: "John Hardy Women's Long Sleeve T-Shirt",
    price: 32.99,
    description: "Comfortable and stylish long sleeve t-shirt made from premium cotton blend. Perfect for casual wear and layering.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71YXoz-3ASL._AC_UY879._SY445._QL65_ML3_.jpg",
    rating: {
      rate: 4.2,
      count: 156
    }
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave Stacking Ring",
    price: 168.99,
    description: "Elegant stacking ring featuring delicate micropave diamonds set in 14k solid gold. Perfect for layering or wearing alone.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMi1GTLB._SX679._SX331._SY445._QL65_FMwebp_.jpg",
    rating: {
      rate: 4.6,
      count: 78
    }
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description: "Beautiful princess-cut pendant plated in white gold with delicate chain. Perfect for everyday elegance.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFHU2ORD._SX679._SX466._SY445._QL65_FMwebp_.jpg",
    rating: {
      rate: 3.9,
      count: 63
    }
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Silver",
    price: 10.99,
    description: "Adorable owl-shaped pierced earrings with rose gold plating over sterling silver. Whimsical yet sophisticated.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71HblAHsMxL._SY679._SX466._SY445._QL65_FMwebp_.jpg",
    rating: {
      rate: 4.1,
      count: 92
    }
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive",
    price: 64.99,
    description: "Ultra-portable external hard drive with 2TB capacity. USB 3.0 interface for fast data transfer. Compatible with Windows and Mac.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._SX679._SY445._QL65_FMwebp_.jpg",
    rating: {
      rate: 3.3,
      count: 203
    }
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 109.99,
    description: "High-performance 1TB internal SSD with fast read/write speeds. Perfect for upgrading laptop or desktop storage.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1wmQaL._SX679._SY445._QL65_FMwebp_.jpg",
    rating: {
      rate: 4.4,
      count: 319
    }
  },
  {
    id: 11,
    title: "Silicon Power 9A Power Bank - 10000mAh",
    price: 199.99,
    description: "Ultra-high capacity power bank with 10000mAh. Fast charging technology with multiple USB ports. Perfect for travel and emergencies.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61QBV4v9aL._SX679._SY445._QL65_FMwebp_.jpg",
    rating: {
      rate: 4.2,
      count: 156
    }
  },
  {
    id: 12,
    title: "BIYLACLESEN Women's Summer Beach Dress",
    price: 45.99,
    description: "Lightweight and breathable summer dress perfect for beach days and warm weather. Features a flattering A-line silhouette.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71YXoz-3ASL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.3,
      count: 87
    }
  }
];

export async function fetchMockProducts(): Promise<MockProduct[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockProducts;
}

export async function fetchProductsFromAPI(): Promise<MockProduct[]> {
  try {
    console.log('Attempting to fetch from FakeStore API...');
    const res = await fetch('https://fakestoreapi.com/products', { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; Appscrip-Task/1.0)'
      }
    });

    if (!res.ok) {
      throw new Error(`FakeStore API failed: ${res.status} ${res.statusText}`);
    }

    const products = await res.json();
    console.log('Successfully fetched from API:', products.length);
    return products;
  } catch (error) {
    console.warn('API fetch failed, using mock data:', error);
    return fetchMockProducts();
  }
}

export default fetchProductsFromAPI;
