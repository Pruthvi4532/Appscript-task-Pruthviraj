// Sample product data with SEO-friendly image names
const products = [
  {
    id: 1,
    name: "Fjallraven - Foldsack No. 1 Backpack",
    price: 109.95,
    category: "men's clothing",
    rating: 4.5,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    description: "Your perfect pack for everyday use and walks in the forest."
  },
  {
    id: 2,
    name: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    category: "men's clothing",
    rating: 4.1,
    image: "https://fakestoreapi.com/img/71-3HjGNDL._SY879._SX342_.jpg",
    description: "Slim-fit, short sleeve t-shirts for everyday wear."
  },
  {
    id: 3,
    name: "Mens Cotton Jacket",
    price: 55.99,
    category: "men's clothing",
    rating: 4.7,
    image: "https://fakestoreapi.com/img/71li-3A3U._SY879._SX342_.jpg",
    description: "Great cotton jacket for spring and autumn."
  },
  {
    id: 4,
    name: "Mens Casual Slim Fit",
    price: 15.99,
    category: "men's clothing",
    rating: 2.1,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    description: "Comfortable slim fit t-shirt for casual occasions."
  },
  {
    id: 5,
    name: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Bracelet",
    price: 695,
    category: "jewelery",
    rating: 4.0,
    image: "https://fakestoreapi.com/img/71pWzhdJN._AC_UL640_.jpg",
    description: "Elegant silver and gold dragon bracelet for women."
  },
  {
    id: 6,
    name: "Solid Gold Petite Micropave Ring",
    price: 168,
    category: "jewelery",
    rating: 3.9,
    image: "https://fakestoreapi.com/img/61sbEcceuXL._AC_UL640_.jpg",
    description: "Beautiful gold ring with micropave diamonds."
  },
  {
    id: 7,
    name: "White Gold Plated Princess",
    price: 9.99,
    category: "jewelery",
    rating: 3.0,
    image: "https://fakestoreapi.com/img/72Ezfm6mEL._AC_UL640_.jpg",
    description: "Elegant white gold plated princess ring."
  },
  {
    id: 8,
    name: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    category: "jewelery",
    rating: 1.9,
    image: "https://fakestoreapi.com/img/85kL3ktXlL._AC_UL640_.jpg",
    description: "Unique owl design in rose gold plating."
  },
  {
    id: 9,
    name: "WD 2TB Elements Portable External Hard Drive",
    price: 64,
    category: "electronics",
    rating: 3.3,
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.png",
    description: "Portable external hard drive with 2TB capacity."
  },
  {
    id: 10,
    name: "SanDisk SSD PLUS 1TB Internal SSD",
    price: 109,
    category: "electronics",
    rating: 4.8,
    image: "https://fakestoreapi.com/img/61U7dT1MGL._AC_SX679_.png",
    description: "High-performance internal SSD for fast data access."
  },
  {
    id: 11,
    name: "Silicon Power 256GB SSD 3D NAND A55 SLC Cache",
    price: 109,
    category: "electronics",
    rating: 4.8,
    image: "https://fakestoreapi.com/img/71kWymZCnL._AC_SX679_.jpg",
    description: "Reliable SSD with advanced cache technology."
  },
  {
    id: 12,
    name: "WD 4TB Gaming Drive Works with Playstation 4",
    price: 114,
    category: "electronics",
    rating: 4.8,
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.png",
    description: "External gaming drive optimized for PlayStation 4."
  },
  {
    id: 13,
    name: "Acer SB220Q bi 21.5 inches Full HD IPS Ultra-Thin",
    price: 599,
    category: "electronics",
    rating: 2.8,
    image: "https://fakestoreapi.com/img/81QASiB0CxL._AC_SX679_.jpg",
    description: "Ultra-thin Full HD monitor for professionals."
  },
  {
    id: 14,
    name: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
    price: 999.99,
    category: "electronics",
    rating: 4.2,
    image: "https://fakestoreapi.com/img/81ZpkFo7L._AC_SX679_.jpg",
    description: "Immersive curved gaming monitor with 144Hz refresh rate."
  },
  {
    id: 15,
    name: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    category: "women's clothing",
    rating: 2.6,
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.png",
    description: "Versatile 3-in-1 winter jacket for women."
  },
  {
    id: 16,
    name: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    category: "women's clothing",
    rating: 2.9,
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.png",
    description: "Stylish faux leather biker jacket for women."
  }
];

let currentProducts = [...products];
let currentCategory = 'all';
let currentSort = 'featured';

// DOM Elements
const grid = document.querySelector('.plp-grid');
const sortSelect = document.getElementById('sortSelect');
const filterChips = document.querySelectorAll('.chip');

// Utility Functions
function toINR(usd) {
  const inr = Math.round(usd * 83);
  return `₹ ${inr.toLocaleString("en-IN")}`;
}

function createProductCard(product) {
  const card = document.createElement('article');
  card.className = 'card';
  
  card.innerHTML = `
    <img class="card-img" 
         src="${product.image}" 
         alt="${product.name} - ${product.category}" 
         onerror="this.src='./assets/placeholder-product.webp'; console.error('Image failed to load:', this.src);"
         onload="console.log('Image loaded successfully:', this.src);" />
    <div class="card-body">
      <h3 class="card-title">${product.name}</h3>
      <p class="card-meta">${product.category} • ★ ${product.rating}</p>
      <div class="card-row">
        <span class="price">${toINR(product.price)}</span>
        <button class="btn" type="button">Add</button>
      </div>
    </div>
  `;
  
  return card;
}

function renderProducts() {
  grid.innerHTML = '<h2 class="sr-only">Product results</h2>';
  
  currentProducts.forEach(product => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

function sortProducts(products) {
  let sorted = [...products];
  
  switch(currentSort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating-desc':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // featured - keep original order
      break;
  }
  
  return sorted;
}

function filterByCategory(category) {
  currentCategory = category;
  currentProducts = category === 'all' 
    ? [...products] 
    : products.filter(p => p.category === category);
}

function updateActiveStates() {
  // Update filter chips
  filterChips.forEach(chip => {
    const chipCategory = chip.getAttribute('data-category');
    if (chipCategory === currentCategory) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
  
  // Update sort select
  sortSelect.value = currentSort;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initial render
  renderProducts();
  
  // Filter chip clicks
  filterChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      filterByCategory(category);
      updateActiveStates();
    });
  });
  
  // Sort change
  sortSelect.addEventListener('change', function() {
    currentSort = this.value;
    const filtered = currentCategory === 'all' 
      ? [...products] 
      : products.filter(p => p.category === currentCategory);
    
    const sorted = sortProducts(filtered);
    currentProducts = sorted;
    renderProducts();
  });
});

// SEO: Update page title and meta description dynamically
function updateSEO() {
  const categoryText = currentCategory === 'all' ? 'All Products' : `${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}`;
  const sortText = currentSort === 'featured' ? 'Featured' : 
                   currentSort === 'price-asc' ? 'Price Low to High' :
                   currentSort === 'price-desc' ? 'Price High to Low' :
                   currentSort === 'rating-desc' ? 'Top Rated' : 'Sorted';
  
  document.title = `${categoryText} | ${sortText} - Appscrip Store`;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.content = `Browse ${categoryText.toLowerCase()} with ${sortText.toLowerCase()}. Find the best deals on quality products.`;
  }
}
