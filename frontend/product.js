const classicPrice = 11.99;
const cherryPrice = 17.99;
const quantumPrice = 24.99;

let classicInStock = 81;
let cherryInStock = 28;
let quantumInStock = 3;

let cartTotal = 0;
alert("hello")
function addClassic() {
    cartTotal += classicPrice;
    alert("Classic added to cart! Cart total: $" + cartTotal.toFixed(2));
}

function addCherry() {
    cartTotal += cherryPrice;
    alert("Cherry added to cart! Cart total: $" + cartTotal.toFixed(2));
}

function addQuantum() {
    cartTotal += quantumPrice;
    alert("Quantum added to cart! Cart total: $" + cartTotal.toFixed(2))
}
