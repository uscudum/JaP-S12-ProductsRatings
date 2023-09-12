// Definimos la URL de donde obtendremos los datos
const URL = 'https://fakestoreapi.com/products';

// Cuando se carga el contenido HTML en el navegador, llamamos a la función fetchData
document.addEventListener("DOMContentLoaded", function () {
    fetchData(URL);
});

// Función para obtener datos desde la URL
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        products = data;

        // Luego de obtener los datos, llamamos a la función mostrarProductos
        showProducts();
    } catch (error) {
        console.error('Error al obtener datos:', error);
    }
}

// Función para mostrar los productos en la página
function showProducts() {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = '';

    // Recorremos los productos obtenidos
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("list-group-item");

        const productName = document.createElement("h3");

        //"Si la longitud de "product.title" es mayor a 20 caracteres,
        // se mostrarán los primeros 20 seguidos de '...'.
        productName.textContent = cutString(product.title, 20);

        // Obtiene la fecha actual
        const fechaSolicitud = new Date();

        // Agrega la fecha 
        const fechaAgregar = document.createElement("p");
        fechaAgregar.innerText = fechaSolicitud;
        productCard.appendChild(fechaAgregar);

        // Creamos un contenedor para las estrellas y el rate
        const starsAndRateContainer = document.createElement("div");
        starsAndRateContainer.classList.add("stars-and-rate");

        // Creamos las estrellas para la puntuación del producto
        const productRating = product.rating.rate;

        // Creamos un elemento para mostrar el rate (puntaje) al lado de las estrellas
        const rateElement = document.createElement("span");
        rateElement.textContent = `(${productRating})`; // Agrega el rate entre paréntesis

        starsAndRateContainer.appendChild(stars(productRating));
        starsAndRateContainer.appendChild(rateElement);

        // Agregamos el nombre del producto y el contenedor de estrellas y rate al contenedor del producto
        productCard.appendChild(productName);
        productCard.appendChild(starsAndRateContainer);

        // Agregamos el contenedor del producto al contenedor principal
        productsContainer.appendChild(productCard);
    });
}

// Función para crear las estrellas
function stars(puntaje) {
    // Creamos un contenedor exterior para las estrellas
    const starOuter = document.createElement('div');
    starOuter.classList.add('stars-outer'); // Agregamos una clase CSS para aplicar estilos

    // Creamos un elemento interno para representar las estrellas llenas
    const starInner = document.createElement('div');
    starInner.classList.add('stars-inner'); // Agregamos una clase CSS para aplicar estilos

    // Calculamos el ancho del elemento de estrellas llenas en función del puntaje
    // El puntaje se divide por 5 (ya que 5 estrellas es la máxima puntuación) 
    // y luego se multiplica por 100% para obtener el porcentaje de llenado
    starInner.style.width = (puntaje / 5) * 100 + '%';

    // Agregamos el elemento de estrellas llenas al contenedor exterior
    starOuter.appendChild(starInner);
    return starOuter;
}

// La función cutString toma un string y un número límite,
// y limita la longitud del string añadiendo "..." al final si supera el límite establecido.
function cutString(string, limit) { 
    if (string.length > limit) {
        return string.slice(0, limit) + '...';
    }
    return string;
}
