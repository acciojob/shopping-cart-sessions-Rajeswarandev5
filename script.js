// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Get cart from sessionStorage
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="remove-from-cart-btn" data-id="${product.id}">
        Remove
      </button>
    `;

    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const cart = getCart();

  const product = products.find(
    (product) => product.id === Number(productId)
  );

  if (product) {
    cart.push(product);

    sessionStorage.setItem("cart", JSON.stringify(cart));

    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = getCart();

  const index = cart.findIndex(
    (product) => product.id === Number(productId)
  );

  if (index !== -1) {
    cart.splice(index, 1);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([]));

  renderCart();
}

// Add to cart button
productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = event.target.dataset.id;
    addToCart(productId);
  }
});

// Remove from cart button
cartList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = event.target.dataset.id;
    removeFromCart(productId);
  }
});

// Clear cart button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();