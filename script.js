let products = [];
let cart = [];

async function loadProducts() {
  const res = await fetch('data.json');
  products = await res.json();
  displayProducts();
}

function displayProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

  document.querySelectorAll('.add-to-cart').forEach(btn =>
    btn.addEventListener('click', addToCart)
  );
}

function addToCart(e) {
  const id = e.target.dataset.id;
  const product = products.find(p => p.id == id);
  const existing = cart.find(item => item.id == id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id != id);
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById('cartCount');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');

  cartCount.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
  cartItems.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">✖</button>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = total.toFixed(2);
}

document.getElementById('cartButton').addEventListener('click', () => {
  document.getElementById('cartModal').classList.remove('hidden');
});

document.getElementById('closeCart').addEventListener('click', () => {
  document.getElementById('cartModal').classList.add('hidden');
});

loadProducts();
