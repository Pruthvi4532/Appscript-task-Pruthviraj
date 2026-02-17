// Test sorting functionality
console.log("=== SORTING VERIFICATION ===");

// Test data
const testProducts = [
    { name: "Cheap Item", price: 10, rating: 3.0 },
    { name: "Expensive Item", price: 1000, rating: 4.5 },
    { name: "Medium Item", price: 100, rating: 3.5 }
];

// Test Next.js style sorting
function sortProductsNextJS(products, sort) {
    const copy = [...products];
    if (sort === "price_desc") return copy.sort((a, b) => b.price - a.price);
    if (sort === "price_asc") return copy.sort((a, b) => a.price - b.price);
    return copy;
}

// Test HTML style sorting
function sortProductsHTML(products, sortType) {
    let sorted = [...products];
    switch(sortType) {
        case 'price_desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'price_asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
    }
    return sorted;
}

// Run tests
console.log("Original:", testProducts.map(p => `${p.name}: ₹${p.price}`));

const nextDesc = sortProductsNextJS(testProducts, "price_desc");
console.log("Next.js Price Desc:", nextDesc.map(p => `${p.name}: ₹${p.price}`));

const htmlDesc = sortProductsHTML(testProducts, "price_desc");
console.log("HTML Price Desc:", htmlDesc.map(p => `${p.name}: ₹${p.price}`));

// Verify results
const expectedDesc = ["Expensive Item", "Medium Item", "Cheap Item"];
const actualNext = nextDesc.map(p => p.name);
const actualHTML = htmlDesc.map(p => p.name);

console.log("Expected:", expectedDesc);
console.log("Next.js Correct:", JSON.stringify(actualNext) === JSON.stringify(expectedDesc));
console.log("HTML Correct:", JSON.stringify(actualHTML) === JSON.stringify(expectedDesc));
