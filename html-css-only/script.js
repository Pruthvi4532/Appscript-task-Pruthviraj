// Sample product data for HTML version
const products = [
  { id: 1, name: "Fjallraven Backpack", price: 109.95, category: "men's clothing", rating: 3.9 },
  { id: 2, name: "Mens Casual T-Shirt", price: 22.3, category: "men's clothing", rating: 4.1 },
  { id: 3, name: "Mens Cotton Jacket", price: 55.99, category: "men's clothing", rating: 4.7 },
  { id: 4, name: "Mens Slim Fit", price: 15.99, category: "men's clothing", rating: 2.1 },
  { id: 5, name: "Women's Bracelet", price: 695, category: "jewelery", rating: 4.0 },
  { id: 6, name: "Solid Gold Ring", price: 168, category: "jewelery", rating: 3.9 },
  { id: 7, name: "White Gold Princess", price: 9.99, category: "jewelery", rating: 3.0 },
  { id: 8, name: "Pierced Owl Ring", price: 10.99, category: "jewelery", rating: 1.9 },
  { id: 9, name: "WD 2TB Hard Drive", price: 64, category: "electronics", rating: 3.3 },
  { id: 10, name: "SanDisk SSD 1TB", price: 109, category: "electronics", rating: 4.8 },
  { id: 11, name: "Silicon Power 256GB SSD", price: 109, category: "electronics", rating: 4.8 },
  { id: 12, name: "WD 4TB Gaming Drive", price: 114, category: "electronics", rating: 4.8 },
  { id: 13, name: "Acer SB220Q Monitor", price: 599, category: "electronics", rating: 2.8 },
  { id: 14, name: "Samsung 49\" Monitor", price: 999.99, category: "electronics", rating: 4.2 },
  { id: 15, name: "Women's Snowboard Jacket", price: 56.99, category: "women's clothing", rating: 2.6 },
  { id: 16, name: "Women's Leather Jacket", price: 29.95, category: "women's clothing", rating: 2.9 }
];

let currentProducts = [...products];
let currentCategory = 'all';

// Convert USD to INR
function toINR(usd) {
  const inr = Math.round(usd * 83);
  return `₹ ${inr.toLocaleString("en-IN")}`;
}

// Render products
function renderProducts(productsToRender) {
  const grid = document.querySelector('.plp-grid');
  grid.innerHTML = '<h2 class="sr-only">Product results</h2>';
  
  productsToRender.forEach(product => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img class="card-img" src="./assets/placeholder-product.webp" alt="Product image placeholder" />
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-meta">${product.category} • ★ ${product.rating}</p>
        <div class="card-row">
          <span class="price">${toINR(product.price)}</span>
          <button class="btn" type="button">Add</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Sort products
function sortProducts(sortType) {
  console.log('Sorting by:', sortType);
  let sorted = [...currentProducts];
  
  switch(sortType) {
    case 'price_asc':
      sorted.sort((a, b) => a.price - b.price);
      console.log('Price ASC sorted:', sorted.map(p => `${p.name}: ₹${toINR(p.price)}`));
      break;
    case 'price_desc':
      sorted.sort((a, b) => b.price - a.price);
      console.log('Price DESC sorted:', sorted.map(p => `${p.name}: ₹${toINR(p.price)}`));
      break;
    case 'rating_desc':
      sorted.sort((a, b) => b.rating - a.rating);
      console.log('Rating DESC sorted:', sorted.map(p => `${p.name}: ${p.rating}`));
      break;
    default:
      // featured - keep original order
      console.log('Featured order (no sorting)');
      break;
  }
  
  renderProducts(sorted);
}

// Filter by category
function filterByCategory(category) {
  currentCategory = category;
  currentProducts = category === 'all' 
    ? [...products] 
    : products.filter(p => p.category === category);
  
  const currentSort = document.getElementById('sortSelect').value;
  sortProducts(currentSort);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing event listeners');
  console.log('Products:', products);
  
  // Sort dropdown
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function(e) {
      console.log('Sort dropdown changed to:', e.target.value);
      sortProducts(e.target.value);
    });
  } else {
    console.error('Sort select not found!');
  }
  
  // Filter chips
  document.querySelectorAll('.chip').forEach((chip, index) => {
    console.log(`Setting up chip ${index}:`, chip.textContent);
    chip.addEventListener('click', function() {
      // Remove active class from all chips
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      // Add active class to clicked chip
      this.classList.add('is-active');
      
      // Get category from chip text
      const category = this.textContent.toLowerCase().replace('men', "men's clothing").replace('women', "women's clothing");
      console.log('Chip clicked:', this.textContent, 'Category:', category);
      filterByCategory(category);
    });
  });
  
  // Initial render
  renderProducts(currentProducts);
  console.log('Initial render complete');
});
