document.addEventListener('DOMContentLoaded', function() {
    fetchProductsAndCategories();
});

async function fetchProductsAndCategories() {
    try {
        // Fetch both products and categories
        const productsResponse = await fetch('http://3.136.18.203:8000/products/');
        const categoriesResponse = await fetch('http://3.136.18.203:8000/categories/');
        
        if (!productsResponse.ok || !categoriesResponse.ok) {
            throw new Error('Failed to fetch data from API');
        }
        
        const products = await productsResponse.json();
        const categories = await categoriesResponse.json();
        
        // Create a map of category IDs to names for easy lookup
        const categoryMap = {};
        categories.forEach(category => {
            categoryMap[category.id] = category.name;
        });
        
        displayProducts(products, categoryMap);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('products-container').innerHTML = 
            '<p style="color: red;">Error loading products. Please try again later.</p>';
    }
}

function displayProducts(products, categoryMap) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Clear container
    
    if (products.length === 0) {
        container.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.onclick = function() {
            window.location.href = `product.html?product_id=${product.id}`;
        };
        
        // Get category name from the map
        const categoryName = categoryMap[product.category_id] || 'Unknown Category';
        
        // Calculate stock message
        let stockMessage = '';
        if (product.stock_quantity > 50) {
            stockMessage = 'In Stock';
        } else if (product.stock_quantity > 0) {
            stockMessage = `${product.stock_quantity} remaining`;
        } else {
            stockMessage = 'OUT OF STOCK';
        }
        
        productCard.innerHTML = `
            <img class="product-image" src="${product.image_url || '../images/nuka-classic.png'}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-category">${categoryName}</p>
            <p class="product-price">Price: $${product.starting_at_price.toFixed(2)}</p>
            <p class="product-stock">${stockMessage}</p>
        `;
        
        container.appendChild(productCard);
    });
}