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

const addProduct = product => {
    container.innerHTML += `
    <div class="list-group-item">
        <div class="fw-bold">${product.title}</div>
        <div class="d-flex gap-3">
            <span>${new Date().toLocaleString()}</span>
            <div>${stars(Math.floor(product.rating.rate)).outerHTML}</div>
        </div>
    </div>
    `;
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


