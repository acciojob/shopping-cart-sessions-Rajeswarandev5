const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

let cart = [];

// Load cart from sessionStorage
function loadCart() {
  const storedCart = window.sessionStorage.getItem("cart");

  if (storedCart) {
    cart = JSON.parse(storedCart);
  } else {
    cart = [];
  }
}

// Save cart to sessionStorage
function saveCart() {
  window.sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render products
function renderProducts() {
  productList.innerHTML = "";

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

// Render cart
function renderCart() {
  cartList.innerHTML = "";

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
  const product = products.find(
    (p) => p.id === Number(productId)
  );

  if (product) {
    cart.push(product);
    saveCart();
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(
    (product) => product.id !== Number(productId)
  );

  saveCart();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];

  saveCart();
  renderCart();
}

// Add to cart button
productList.addEventListener("click", function (event) {
  if (event.target.classList.contains("add-to-cart-btn")) {
    addToCart(event.target.dataset.id);
  }
});

// Remove from cart button
cartList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    removeFromCart(event.target.dataset.id);
  }
});

// IMPORTANT: Load storage BEFORE initial rendering
loadCart();
renderProducts();
renderCart();