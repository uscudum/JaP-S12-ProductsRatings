const URL = 'https://fakestoreapi.com/products';
let products = [];

document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
    .then(() => {
        showProducts();
    });
});

// Función para obtener datos de la API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        products = data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

// Función para mostrar los productos en la página web
function showProducts() {
    const productsContainer = document.getElementById('products');

    if (products.length === 0) {
        productsContainer.innerHTML = 'No se encontraron productos.';
        return;
    }

    const fechaHoraObtencion = new Date().toLocaleString();

    const listaProductos = document.createElement('ul');
    listaProductos.className = 'list-group';

    products.forEach((producto) => {
        const tituloRecortado = cutString(producto.title, 20);

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        listItem.innerHTML = `<strong>${tituloRecortado}</strong><br>${fechaHoraObtencion} ${stars(producto.rating.rate)}`;
        listaProductos.appendChild(listItem);
        
    });

    productsContainer.appendChild(listaProductos);
}

// Función para convertir una puntuación en estrellas (llenas y vacías)
function stars(puntuacion) {
    const puntuacionEntera = Math.round(puntuacion); // Redondea al entero más cercano
    const estrellasLlenas = puntuacionEntera; // Estrellas llenas
    const estrellasVacias = 5 - puntuacionEntera; // Estrellas vacías

    const resultado = '★'.repeat(estrellasLlenas) + '☆'.repeat(estrellasVacias);
    return `${resultado} (${puntuacion.toFixed(1)}/5)`;
}

// Función para recortar una cadena si es más larga que la longitud especificada
function cutString(string, length) {
    if (string.length <= length) {
        return string;
    } else {
        return string.slice(0, length) + '...';
    }
}