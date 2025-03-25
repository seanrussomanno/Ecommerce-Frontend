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

function updatePrice() {
    let priceDisplay = document.getElementById("selected-price");
    const selectedVariety = varieties.find(item => item.flavor === selectedProduct);
    if (selectedVariety) {
        priceDisplay.textContent = "$" + selectedVariety.price.toFixed(2);
    }
};

// <><><><><><><><<><><><<><><><><><><><><><><><<><><><><><>><><
// ***updatePrice was all hardcoded and i changed it for JS functionality***
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
// <><><><><><><><<><><><<><><><><><><><><><><><<><><><><><>><><


function generateDropdownOptions() {
    const selectElement = document.getElementById("product-select");
    selectElement.innerHTML = "";
    varieties.forEach(variety => {
        const option = document.createElement("option");
        option.value = variety.flavor;
        
        option.textContent = variety.flavor.charAt(0).toUpperCase() + variety.flavor.slice(1);
        
        selectElement.appendChild(option);
    });
    
    selectElement.addEventListener("change", function() {
        selectProduct(this.value);
    });
};

function selectProduct(product) {
    selectedProduct = product;
    updatePrice();
};

// function addToCart() {
//     if (selectedProduct === "classic") {
//         cartTotal += classicPrice;
//         alert("Classic added to cart! Cart total: $" + cartTotal.toFixed(2));
//     } else if (selectedProduct === "cherry") {
//         cartTotal += cherryPrice;
//         alert("Cherry added to cart! Cart total: $" + cartTotal.toFixed(2));
//     } else if (selectedProduct === "quantum") {
//         cartTotal += quantumPrice;
//         alert("Quantum added to cart! Cart total: $" + cartTotal.toFixed(2));
//     }
// }

function addToCart() {
    const selectedVariety = varieties.find(item => item.flavor === selectedProduct);
    
    if (selectedVariety) {
        cartTotal += selectedVariety.price;
        
        const flavorName = selectedVariety.flavor.charAt(0).toUpperCase() + selectedVariety.flavor.slice(1);
        const message = `${flavorName} Nuka-Cola Added (Costs $${selectedVariety.price.toFixed(2)}) - Total $${cartTotal.toFixed(2)}`;
        
        alert(message);
    }
}

window.onload = function() {
    generateDropdownOptions();
    updatePrice(); 
};

