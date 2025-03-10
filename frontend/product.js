// Initialize cart total variable
let cartTotal = 0;

// Define product varieties and their prices
const productVarieties = [
    { name: "Small", price: 10.99 },
    { name: "Medium", price: 14.99 },
    { name: "Large", price: 19.99 }
];

// Function to initialize the page when it loads
function initializePage() {
    // Check if we're on a product page
    if (document.querySelector('.product-container')) {
        // Create and add the variety dropdown
        createVarietyDropdown();
        
        // Update price display with the default variety (first one)
        updateProductPrice(0);
        
        // Add event listener to the "Add to Cart" button
        const buyButton = document.querySelector('.buy-button');
        if (buyButton) {
            buyButton.addEventListener('click', addToCart);
            
            // Prevent the default behavior (page reload)
            buyButton.onclick = function(event) {
                event.preventDefault();
            };
        }
    }
}

// Function to create the variety dropdown
function createVarietyDropdown() {
    // Create select element
    const selectElement = document.createElement('select');
    selectElement.id = 'product-variety';
    selectElement.className = 'product-variety';
    
    // Add options based on our varieties array
    productVarieties.forEach((variety, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = variety.name;
        selectElement.appendChild(option);
    });
    
    // Add change event listener to update price when selection changes
    selectElement.addEventListener('change', function() {
        updateProductPrice(this.value);
    });
    
    // Create label for the dropdown
    const label = document.createElement('label');
    label.htmlFor = 'product-variety';
    label.textContent = 'Size: ';
    
    // Create container for the dropdown
    const container = document.createElement('div');
    container.className = 'variety-container';
    container.appendChild(label);
    container.appendChild(selectElement);
    
    // Insert the dropdown before the buy button
    const buyButton = document.querySelector('.buy-button');
    if (buyButton) {
        buyButton.parentNode.insertBefore(container, buyButton);
    }
}

// Function to update the displayed product price
function updateProductPrice(varietyIndex) {
    const price = productVarieties[varietyIndex].price;
    const priceElement = document.querySelector('.product-price');
    
    if (priceElement) {
        priceElement.textContent = `Price: $${price.toFixed(2)}`;
    }
}

// Function to handle adding item to cart
function addToCart(event) {
    // Prevent default behavior (which would reload the page)
    event.preventDefault();
    
    // Get the selected variety
    const selectElement = document.getElementById('product-variety');
    const selectedVarietyIndex = parseInt(selectElement.value);
    const selectedVariety = productVarieties[selectedVarietyIndex];
    
    // Add the price to cart total
    cartTotal += selectedVariety.price;
    
    // Get product name
    const productName = document.getElementById('product-title').textContent;
    
    // Show alert with info
    alert(`${selectedVariety.name} ${productName} Added (Costs $${selectedVariety.price.toFixed(2)}) - Total $${cartTotal.toFixed(2)}`);
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializePage);