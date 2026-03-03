export default async function decorate(block) {
  try {
    const response = await fetch('/products.json');
    const data = await response.json();

    const products = data.data;

    const container = document.createElement('div');
    container.className = 'product-container';

    products.forEach((product) => {
      const card = document.createElement('div');
      card.className = 'product-card';

      card.innerHTML = `
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">₹${product.price}</p>
        <p class="product-category">${product.category}</p>
      `;

      container.appendChild(card);
    });
    block.appendChild(container);
  } catch (error) {
    console.log('Error loading products:', error);
  }
}
