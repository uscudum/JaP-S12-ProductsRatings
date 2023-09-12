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

// Esta función recorre el array 'products' y lo muestra uno por uno.
function showProducts() {
    products.forEach(product => {
        container.innerHTML += `
        <div class="list-group-item">
            <div class="fw-bold">${cutString(product.title)}</div>
            <div class="d-flex gap-2">
                <span>${new Date().toLocaleString()}</span>
                <div>
                    ${stars(Math.floor(product.rating.rate), 5)}
                </div>
            </div>
        </div>
        `;
    });
}

// Crea una variable que se inicializa con una cadena vacía y se le agrega cada una de las estrellas. Al finalizar, retorna esta variable.
function stars(cantidad, maxStars) {
    let starsHTML = '';
    for (i = 0; i < maxStars; i++) {
        starsHTML += `<i class="fa fa-star" style="color: ${i < cantidad ? '#ffa200' : '#252525'};"></i>`
    }
    return starsHTML;
}


// Si el String, que recibe como parámetro, supera los 20 caracteres de largo,
// se elimina el sobrante y se remplaza por la cadena de texto '...'.
function cutString(string) {
    return string.length > 20 ? string.slice(0, 20) + '...' : string;
}


