// Initialize cart from localStorage or create a new one
let cart = JSON.parse(localStorage.getItem('wastelandCart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    const name = urlParams.get('name');
    const price = parseFloat(urlParams.get('price') || 0);
    const image = urlParams.get('image');
    
    // If we have product data, add it to the cart
    if (product && name && price) {
        // Check if product already exists in cart
        const existingProduct = cart.find(item => item.product === product);
        
        if (existingProduct) {
            // Increment quantity if product exists
            existingProduct.quantity += 1;
        } else {
            // Add new product to cart
            cart.push({
                product: product,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }
        
        // Save cart to localStorage
        localStorage.setItem('wastelandCart', JSON.stringify(cart));
        
        // Clear URL parameters to prevent adding same item multiple times on refresh
        window.history.replaceState({}, document.title, 'shopping_cart.html');    }
    
    // Update the cart display
    updateCartDisplay();
});

// Display all items from cart
function updateCartDisplay() {
    const cartBody = document.getElementById('cart-body');
    
    // Clear existing content
    cartBody.innerHTML = '';
    
    // Check if cart is empty
    if (cart.length === 0) {
        // Cart is empty, show a message
        cartBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px;">
                    Your cart is empty.<br> 
                    <a href="product.html" style="color:white"><br>
                    Continue shopping</a>
                </td>
            </tr>
        `;
        
        // Hide the total section
        document.querySelector('.total-section').style.display = 'none';
    } else {
        // Add each item to the cart display
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.id = 'cart-item-' + item.product;
            
            // Calculate total for this item
            const total = item.price * item.quantity;
            
            // Set row HTML
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" class="product-img"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" class="quantity-input" 
                           onchange="updateQuantity(this, '${item.product}')">
                </td>
                <td class="item-total">$${total.toFixed(2)}</td>
                <td><button class="remove-btn" onclick="removeItem('${item.product}')">Remove</button></td>
            `;
            
            // Add row to table
            cartBody.appendChild(row);
        });
        
        // Show the total section
        document.querySelector('.total-section').style.display = 'block';
        
        // Update the overall total
        updateTotal();
    }
}

// Update quantity for an item
function updateQuantity(input, product) {
    // Get the quantity
    const quantity = parseInt(input.value);
    
    // Find the product in the cart
    const item = cart.find(item => item.product === product);
    
    if (item) {
        // Update quantity
        item.quantity = quantity;
        
        // Calculate new total
        const total = item.price * quantity;
        
        // Update total display
        const row = document.getElementById('cart-item-' + product);
        row.querySelector('.item-total').textContent = '$' + total.toFixed(2);
        
        // Save updated cart
        localStorage.setItem('wastelandCart', JSON.stringify(cart));
        
        // Update cart total
        updateTotal();
    }
}

// Remove an item from cart
function removeItem(product) {
    // Remove from cart array
    cart = cart.filter(item => item.product !== product);
    
    // Save updated cart
    localStorage.setItem('wastelandCart', JSON.stringify(cart));
    
    // Update display
    updateCartDisplay();
}

// Update the cart total
function updateTotal() {
    // Calculate the total from cart data
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update the total display
    document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
}

// Function to clear the entire cart
function clearCart() {
    cart = [];
    localStorage.removeItem('wastelandCart');
    updateCartDisplay();
}

// Checkout page functions

function loadCheckoutData() {
    // Make sure we're on the checkout page
    if (!document.getElementById('checkout-items')) return;
    
    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('wastelandCart')) || [];
    
    // If cart is empty, redirect back to cart page
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        window.location.href = 'shopping_cart.html';
        return;
    }
    
    // Display the items
    displayCheckoutItems(cart);
    
    // Calculate and display order totals
    updateCheckoutTotals(cart);
}

// Get cart items (from localStorage or session)
function getCartItems() {
    // Initialize empty cart
    let cart = [];
    
    // Get URL parameters (for direct links from product pages)
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    
    if (product) {
        // Single item from URL parameters
        cart.push({
            id: product,
            name: urlParams.get('name'),
            price: parseFloat(urlParams.get('price')),
            image: urlParams.get('image'),
            quantity: parseInt(urlParams.get('quantity') || 1)
        });
    } else {
        // Try to get cart from localStorage
        const storedCart = localStorage.getItem('nukaColaCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
    }
    
    return cart;
}

// Display checkout items
function displayCheckoutItems(cart) {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    if (!checkoutItemsContainer) return;
    
    // Clear current items
    checkoutItemsContainer.innerHTML = '';
    
    // Add each item
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        
        const itemTotal = item.price * item.quantity;
        
        itemElement.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <span>${item.name} × ${item.quantity}</span>
            </div>
            <div class="item-price">$${itemTotal.toFixed(2)}</div>
        `;
        
        checkoutItemsContainer.appendChild(itemElement);
    });
}

function updateCheckoutTotals(cart) {
    // Calculate subtotal
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate tax (9%)
    const tax = subtotal * 0.09;
    
    // Calculate shipping (free over $50)
    const shipping = subtotal > 50 ? 0 : 5;
    
    // Calculate total
    const total = subtotal + tax + shipping;
    
    // Update display
    document.getElementById('checkout-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('checkout-tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('checkout-shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
    document.getElementById('checkout-total').textContent = '$' + total.toFixed(2);
}

// Handle place order submission
function placeOrder() {
    // Get form values
    const name = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const region = document.getElementById('region').value;
    const paymentMethod = document.getElementById('payment-method').value;
    
    // Validate form
    if (!name || !email || !address || !city || !region || !paymentMethod) {
        alert('Please fill in all required shipping and payment information.');
        return;
    }
    
    // Get region text
    const regionText = document.getElementById('region').options[document.getElementById('region').selectedIndex].text;
    
    // Get payment method text
    const paymentText = document.getElementById('payment-method').options[document.getElementById('payment-method').selectedIndex].text;
    
    // Display confirmation message
    alert(`Thank you for your order, ${name}!\n\nYour Nuka-Cola products will be delivered to ${address}, ${city} in the ${regionText}.\n\nPlease have your ${paymentText} ready upon delivery.`);
    
    // Clear cart
    localStorage.removeItem('wastelandCart');
    
    // Redirect to home page
    window.location.href = 'product.html';
}

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    // If on checkout page, load checkout data
    if (document.getElementById('checkout-items')) {
        loadCheckoutData();
    }
    
    // If the checkout button exists on the cart page, set it up
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
});

