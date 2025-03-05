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
        window.history.replaceState({}, document.title, '/frontend/shopping_cart.html');
    }
    
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