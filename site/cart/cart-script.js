import listener from '../listeners.js';
import { refreshLoginDependant, refreshAllCardButtons } from '../lib.js';
import productList from '../productList.js';

const logoutButton = document.querySelector('.logout-button');
listener.logout(logoutButton);

refreshLoginDependant();
productList.gerFrom('/api/cart-content/', '/shop/podutct-card.html')
  .then(refreshAllCardButtons);

// вынести
const refreshTotalPrice = () => {
  const totalCostElem = document.querySelector('.total-price');
  fetch('/api/cart-total-price/')
    .then((resp) => resp.json())
    .then(JSON.stringify)
    // .then(console.log)
    .then((totalCost) => { totalCostElem.textContent = `${totalCost} \u20bd`; });
};

//
// const addListenerToBuyButton = (btn) => {
//   btn.addEventListener('click', (event) => {
//     const productID = event.target.closest('.product-card').id;
//     fetch(`/api/add-to-cart/${productID}`, { method: 'POST' })
//       .then((response) => response.json())
//       .then(JSON.stringify)
//       .then(console.log)
//       .then(refreshTotalPrice());
//   });
// };

// const addCard = async () => fetch('../shop/podutct-card.html')
//   .then((cardResponse) => cardResponse.text())
//   .then((html) => {
//     const parser = new DOMParser();
//     const cardDoc = parser.parseFromString(html, 'text/html');
//     const card = cardDoc.querySelector('.product-card');
//     const productList = document.querySelector('.product-list-container');
//     productList.append(card);
//     return card;
//   });
// --- заполнение списка товаров ---
// const getProducts = async () => {
//   const products = await fetch('/api/cart-content/')
//     .then(async (response) => {
//       const obj = await response.json();
//       return obj;
//     });
//   Object.entries(products).forEach(async ([ID, info]) => {
//     const card = await addCard();
//     card.querySelector('.img-container img').src = info.productImgPath;
//     card.querySelector('.product-brand').textContent = info.brand;
//     card.querySelector('.product-name').textContent = info.name;
//     card.querySelector('.product-description').textContent = info.description;
//     card.querySelector('.price').textContent = `${info.price} \u20bd`;
//     addListenerToBuyButton(card.querySelector('.add-to-cart-button'));
//     card.id = ID;
//     console.log(`ID: ${ID} | info: ${info}`);
//   });

//   return products;
// };

// productList.gerFrom('/api/cart-content/', '/shop/podutct-card.html')
//   .then(refreshAllCardButtons);
// refreshTotalPrice();