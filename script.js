/*
 * En esta solución, hemos decidido crear aún más funciones
 * que las propuestas al inicio. Esto para modularizar más
 * y mejorando la legibilidad del código.
 */


const URL = 'https://fakestoreapi.com/products'
const container = document.querySelector('#products')

document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
})

async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    products = data;

    showProducts();
}

const formatDate = date => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${day}/${month}/${year}, ${hour}:${minute}:${second}`;
}

const addProduct = product => {
    const productItem = document.createElement('div');
    productItem.classList.add('list-group-item');

    const date = document.createElement('span');
    date.textContent = formatDate(new Date());
    
    const quantityStars = Math.floor(product.rating.rate);

    const productName = document.createElement('div');
    productName.classList.add('fw-bold');
    productName.textContent = cutString(product.title);

    const b_container = document.createElement('div');
    b_container.classList.add('d-flex', 'gap-3');

    b_container.appendChild(date);
    b_container.appendChild(stars(quantityStars));

    productItem.appendChild(productName);
    productItem.appendChild(b_container);

    container.appendChild(productItem)
};

function showProducts() {
    products.forEach(product => {
        addProduct(product);
    });
}

const addStar = (iteration, cantidad) => {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');

    iteration < cantidad ? star.setAttribute('style', 'color: #ffa200;') : star.setAttribute('style', 'color: #252525;')

    return star;
}

function stars(cantidad) {
    const starContainer = document.createElement('div');

    for (i = 0; i < 5; i++) {
        starContainer.appendChild(addStar(i, cantidad));
    }

    return starContainer;
}


/* Si el título supera los 20 carácteres, este se "corta",
 * mostrando signos de puntación al superar este límite.
 */
function cutString(string) {
    return string.length > 20 ? string.slice(0, 20) + '...' : string;
}


