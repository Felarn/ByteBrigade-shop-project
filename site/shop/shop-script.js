import common from '../common.js';

// ---- добавление товаров -------
const addListenerToBuyButton = (btn) => {
  btn.addEventListener('click', (event) => {
    const productID = event.target.closest('.product-list-item').id;
    fetch(`/api/add-to-cart/${productID}`, { method: 'POST' });
  });
};

const addCard = async () => fetch('./podutct-card.html')
  .then((cardResponse) => cardResponse.text())
  .then((html) => {
    const parser = new DOMParser();
    const cardDoc = parser.parseFromString(html, 'text/html');
    const card = cardDoc.querySelector('.product-list-item');
    const productList = document.querySelector('.product-list-container');
    productList.append(card);
    return card;
  });

const getProducts = async () => {
  const products = await fetch('/api/products/')
    .then(async (response) => {
      const obj = await response.json();
      return obj;
    });
  Object.entries(products).forEach(async ([ID, info]) => {
    const card = await addCard();
    card.querySelector('.img-container img').src = info.productImgPath;
    card.querySelector('.product-brand').textContent = info.brand;
    card.querySelector('.product-name').textContent = info.name;
    card.querySelector('.product-description').textContent = info.description;
    card.querySelector('.price').textContent = `${info.price} \u20bd`;
    addListenerToBuyButton(card.querySelector('.add-to-cart-button'));
    card.id = ID;
    console.log(`ID: ${ID} | info: ${info}`);
  });

  return products;
};

getProducts();
// --------- выход
const logoutButton = document.querySelector('.logout-button');
logoutButton.addEventListener('click', (e) => {
  fetch('/api/logout', {
    method: 'DELETE',
  })
    .then(() => { common.refreshVisibility(); });
});

common.refreshVisibility();
