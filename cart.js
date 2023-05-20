// Sample data for demonstration
const cartItems = [
  {
    id: 1,
    image: 'images/iphone_14_pro_max.jpg',
    name: 'Product 1',
    inStock: true,
    color: 'Deep Purple',
    quantity: 2,
    price: 10
  },
  {
    id: 2,
    image: 'images/macbook_pro.jpg',
    name: 'Product 2',
    inStock: false,
    color: 'Space Gray',
    quantity: 1,
    price: 15
  }
];

// Function to render cart items
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    cartItem.appendChild(itemImage);

    const itemDetails = document.createElement('div');
    itemDetails.className = 'item-details';

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;
    itemDetails.appendChild(itemName);

    const itemStock = document.createElement('p');
    itemStock.textContent = item.inStock ? 'In Stock' : 'Out of Stock';
    itemDetails.appendChild(itemStock);

    if (item.color) {
      const itemColor = document.createElement('p');
      itemColor.textContent = `Color: ${item.color}`;
      itemDetails.appendChild(itemColor);
    }

    const itemQuantity = document.createElement('input');
    itemQuantity.type = 'number';
    itemQuantity.value = item.quantity;
    itemQuantity.addEventListener('input', (event) => {
      updateCartItemQuantity(item.id, event.target.value);
    });
    itemDetails.appendChild(itemQuantity);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      removeCartItem(item.id);
    });
    itemDetails.appendChild(deleteBtn);

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `Price: $${item.price}`;
    itemDetails.appendChild(itemPrice);

    cartItem.appendChild(itemDetails);

    cartItemsContainer.appendChild(cartItem);
  });
}

// Function to calculate and display the subtotal
function calculateSubtotal() {
  const subtotalContainer = document.getElementById('subtotal');
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  subtotalContainer.textContent = `Subtotal (${totalItems} item${totalItems !== 1 ? 's' : ''}): $${totalPrice}`;
}

// Function to remove a cart item
function removeCartItem(itemId) {
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    renderCartItems();
    calculateSubtotal();
  }
}

// Function to update the quantity of a cart item
function updateCartItemQuantity(itemId, newQuantity) {
  const item = cartItems.find(item => item.id === itemId);
  if (item) {
    item.quantity = parseInt(newQuantity, 10);
    calculateSubtotal();
  }
}

// Function to add a new item to the cart
function addToCart(event) {
  // Prevent the default form submission or button click behavior
  event.preventDefault();

  // Extract the product details
  const productId = event.target.dataset.productId;
  const productName = event.target.dataset.productName;
  const productPrice = event.target.dataset.productPrice;
  // ... extract other relevant details

  // Create a new item object
  const newItem = {
    id: productId,
    name: productName,
    price: productPrice,
    quantity: 1 // Set initial quantity to 1
    // ... add other relevant properties
  };

  // Add the item to the cart
  addItemToCart(newItem);
}

// Function to add a new item to the cart
function addItemToCart(item) {
  // Check if the item already exists in the cart
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

  if (existingItem) {
    // If the item already exists, increment the quantity
    existingItem.quantity += 1;
  } else {
    // Otherwise, add the item to the cart
    cartItems.push(item);
  }

  renderCartItems();
  calculateSubtotal();
}

// Add event listener for the checkout button
const checkoutBtn = document.getElementById('checkout-btn');
checkoutBtn.addEventListener('click', () => {
  // Handle checkout logic here
  console.log('Proceeding to checkout...');
});

// Render initial cart items and subtotal
renderCartItems();
calculateSubtotal();

// Add event listener to the "Add to Cart" button
const addToCartBtn = document.getElementById('add-to-cart-btn');
addToCartBtn.addEventListener('click', addToCart);
