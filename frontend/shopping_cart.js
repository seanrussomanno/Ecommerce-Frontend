document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const product = urlParams.get('product');
    const name = urlParams.get('name');
    const price = parseFloat(urlParams.get('price') || 0);
    const image = urlParams.get('image');
    
    // If we have product data, add it to the cart
    if (product && name && price) {
        addToCart(product, name, price, image);
    }
    
    // Update the cart display
    updateCartDisplay();
});

// Add product to cart
function addToCart(product, name, price, image) {
    // Create a table row for the product
    const cartBody = document.getElementById('cart-body');
    
    // Create row
    const row = document.createElement('tr');
    row.id = 'cart-item-' + product;
    
    // Set initial quantity
    const quantity = 1;
    
    // Calculate total
    const total = price * quantity;
    
    // Set row HTML
    row.innerHTML = `
        <td><img src="${image}" alt="${name}" class="product-img"></td>
        <td>${name}</td>
        <td>$${price.toFixed(2)}</td>
        <td>
            <input type="number" min="1" value="${quantity}" class="quantity-input" 
                   onchange="updateQuantity(this, '${product}', ${price})">
        </td>
        <td class="item-total">$${total.toFixed(2)}</td>
        <td><button class="remove-btn" onclick="removeItem('${product}')">Remove</button></td>
    `;
    
    // Add row to table
    cartBody.appendChild(row);
    
    // Update total
    updateTotal();
}

// Update quantity for an item
function updateQuantity(input, product, price) {
    // Get the quantity
    const quantity = parseInt(input.value);
    
    // Calculate new total
    const total = price * quantity;
    
    // Update total display
    const row = document.getElementById('cart-item-' + product);
    row.querySelector('.item-total').textContent = '$' + total.toFixed(2);
    
    // Update cart total
    updateTotal();
}

// Remove an item from cart
function removeItem(product) {
    // Get the item row
    const row = document.getElementById('cart-item-' + product);
    
    // Remove it if it exists
    if (row) {
        row.remove();
    }
    
    // Update cart total
    updateTotal();
}

// Update the cart total
function updateTotal() {
    // Get all item totals
    const itemTotals = document.querySelectorAll('.item-total');
    
    // Calculate the sum
    let total = 0;
    itemTotals.forEach(item => {
        total += parseFloat(item.textContent.replace('$', ''));
    });
    
    // Update the total display
    document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
}

// Update the cart display
function updateCartDisplay() {
    // Check if cart is empty
    const cartBody = document.getElementById('cart-body');
    
    if (cartBody.children.length === 0) {
        // Cart is empty, show a message
        cartBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px;">
                    Your cart is empty. <a href="product.html">Continue shopping</a>
                </td>
            </tr>
        `;
        
        // Hide the total section
        document.querySelector('.total-section').style.display = 'none';
    } else {
        // Show the total section
        document.querySelector('.total-section').style.display = 'block';
    }
}