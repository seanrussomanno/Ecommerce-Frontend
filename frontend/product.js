// const classicPrice = 11.99;
// const cherryPrice = 17.99;
// const quantumPrice = 24.99;

const varieties = [
    {flavor: "classic", price:11.99},
    {flavor: "cherry", price:17.99},
    {flavor: "quantum", price:24.99}
];

let cartTotal = 0;
let selectedProduct = "classic"; 


// function updatePrice() {
//     let priceDisplay = document.getElementById("selected-price");
    
//     if (selectedProduct === "classic") {
//         priceDisplay.textContent = "$" + classicPrice.toFixed(2);
//     } else if (selectedProduct === "cherry") {
//         priceDisplay.textContent = "$" + cherryPrice.toFixed(2);
//     } else if (selectedProduct === "quantum") {
//         priceDisplay.textContent = "$" + quantumPrice.toFixed(2);
//     }
// }
// THis ^^ did not use the array and was hardcoded.

function selectProduct(product) {
    selectedProduct = product;
    updatePrice();
}

function addToCart() {
    if (selectedProduct === "classic") {
        cartTotal += classicPrice;
        alert("Classic added to cart! Cart total: $" + cartTotal.toFixed(2));
    } else if (selectedProduct === "cherry") {
        cartTotal += cherryPrice;
        alert("Cherry added to cart! Cart total: $" + cartTotal.toFixed(2));
    } else if (selectedProduct === "quantum") {
        cartTotal += quantumPrice;
        alert("Quantum added to cart! Cart total: $" + cartTotal.toFixed(2));
    }
}

window.onload = function() {
    updatePrice(); 
};