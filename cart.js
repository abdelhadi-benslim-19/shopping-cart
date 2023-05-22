// navbar functionality
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar-links');

navbarToggle.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navbarLinks.classList.remove('active');
  }
});

// Retrieve the cart items from localStorage or initialize an empty array
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to generate HTML for each cart item
function generateCartItemHTML(item) {
  return `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h2 class="cart-item-name">${item.name}</h2>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
      </div>
    </div>
  `;
}


// Function to display cart items on the cart page
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items-container');
  cartItemsContainer.innerHTML = ''; // Clear the container

  cartItems.forEach(item => {
    const itemHTML = generateCartItemHTML(item);
    cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
  });
}

// Function to calculate and display the subtotal price
function calculateSubtotal() {
  const subtotalAmount = document.getElementById('subtotal-amount');
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  subtotalAmount.textContent = subtotal.toFixed(2);
}

// Function to handle the "Add to Cart" button click event
function handleAddToCart(event) {
  const productId = event.target.dataset.productid;
  const productName = event.target.dataset.productname;
  const productPrice = event.target.dataset.productprice;
  const productImage = event.target.dataset.productimage;

  // Create a new cart item object
  const newItem = {
    id: productId,
    name: productName,
    price: parseFloat(productPrice.replace(',', '')),
    image: productImage,
    quantity: 1
  };

  // Check if the product is already in the cart
  const existingItemIndex = cartItems.findIndex(item => item.id === productId);
  if (existingItemIndex !== -1) {
    // If the product is already in the cart, increase the quantity
    cartItems[existingItemIndex].quantity++;
  } else {
    // Otherwise, add the product to the cart
    cartItems.push(newItem);
  }

  // Save the updated cart items to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Call the displayCartItems function to update the cart page
  displayCartItems();

  // Call the calculateSubtotal function to update the subtotal price
  calculateSubtotal();

  // Redirect to the cart page
  window.location.assign('cart.html');


  // Provide feedback to the user (you can modify this as needed)
  alert('Product added to cart!');
}

// Attach the event listener to the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
  button.addEventListener('click', handleAddToCart);
});

// Call the displayCartItems function to populate the cart page on page load
displayCartItems();

// Call the calculateSubtotal function to calculate and display the subtotal price on page load
calculateSubtotal();
