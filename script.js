/*
 * Nuestra solución cuenta con una cantidad de funciones
 * superior a las dadas en primera instancia. Esta decisión 
 * viene a raíz de una modularización y legibilidad mayor del código.
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

// La función 'addProduct' agrega un producto en el HTML.
const addProduct = product => {
    container.innerHTML += `
    <div class="list-group-item">
        <div class="fw-bold">${cutString(product.title)}</div>
        <div class="d-flex gap-2">
            <span>${new Date().toLocaleString()}</span>
            ${stars(Math.floor(product.rating.rate)).outerHTML}
        </div>
    </div>
    `;
};

// Esta función recorre el array 'products' y lo muestra uno por uno.
function showProducts() {
    products.forEach(product => {
        addProduct(product);
    });
}

// Función que retorna el código HTML de una estrella
const addStar = (iteration, cantidad) => {
    return `<i class="fa fa-star" style="color: ${iteration < cantidad ? '#ffa200' : '#252525'};"></i>`;
};

// Esta función crea un elemento 'div' que termina retornando con todas las estrellas.
function stars(cantidad) {
    const products = document.createElement('div');
    for (i = 0; i < 5; i++) {
        products.innerHTML += addStar(i, cantidad);
    }
    return products;
}


/* 
 * Si el título supera los 20 carácteres, este se "corta",
 * mostrando signos de puntación al superar este límite.
 */
function cutString(string) {
    return string.length > 20 ? string.slice(0, 20) + '...' : string;
}


