const URL = 'https://fakestoreapi.com/products'
const products = document.getElementById("products")

document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
})
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("No se pudo obtener respuesta de la API");
        }
        const data = await response.json();
        showProducts(data);
    } catch (error) {
        console.error("Error al obtener los datos", error);
    }
}

// Función para listar los productos 

function showProducts(data) {
    products.innerHTML = ""; // Limpia la lista de productos

    data.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.classList.add("list-group-item", "list-group-item-action");
        const shortTitle = cutString(product.title, 20);
        const ahora = dateTime();
        productItem.innerHTML = `
            <div class="row">
            <div class="col">
                <h6>${shortTitle}</h6>
                <small>${ahora}</small>
                ${stars(parseInt(product.rating.rate))}
            </div>
        </div>
    `;
        products.appendChild(productItem);
    });
}

// Función para mostrar la cantidad de estrellas vacías y no vacías
function stars(cantidad) {
    const starsArray = Array.from({ length: cantidad }, () => '<span style= color:#ffa500> ★ </span>');
    const starsEmptyArray = Array.from({ length: 5 - cantidad }, () => ' ☆');
    return starsArray.join(' ') + starsEmptyArray.join(' ');
}

// Función para mostrar solamente 20 carácteres
function cutString(string, maxLength) {
    if (string.length > maxLength) {
        return string.slice(0, maxLength) + "...";
    }
    return string;
}

// Función para cmostrar la fecha y hora de los productos
function dateTime() {
    const fechaHora = new Date();
    return fechaHora.toLocaleString();
}


