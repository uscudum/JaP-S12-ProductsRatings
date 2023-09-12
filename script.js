const URL = 'https://fakestoreapi.com/products'
const list = document.getElementsByClassName('list-group');
let arrProd = [];
document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
})

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        arrProd = data;
        showProducts(arrProd);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
}

function showProducts(products) {
    const fecha = new Date().toLocaleString('es-ES', {
        hour12: false,
    });
    for (let i = 0; i < products.length; i++) {
        const listProduct = document.createElement('div');
        listProduct.classList.add('list-group-item', 'list-group-item-action', 'cursor-active', 'shadow-lg', 'text-dark', 'p-3', 'mb-5');
        const tituloCorto = cutString(products[i].title);
        const estrella = stars(products[i].rating.rate);
        listProduct.innerHTML = `
            <h4><strong>${tituloCorto}</strong></h4>
            <p>Puntuación:${estrella} </p>
            <p>Fecha: ${fecha} </p>
        `;
        list[0].appendChild(listProduct);
    }
}


/*----------------------------------------------------------------------------*/
    function stars(cantidad) {
        const starIcon = '⭐';
        const starsString = starIcon.repeat(cantidad);
        return starsString;
    }

/*--------------------------------------------------------------------------------*/
    function cutString(producto) {
        if (producto.length > 20) {
            return producto.substring(0, 20) + '...';
        } else {
            return producto;
        }
    }
