const URL = 'https://fakestoreapi.com/products';
const list = document.getElementsByClassName('list-group');

document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
})
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error');
        }
        const data = await response.json();
        products = data;
        showProducts(data);
        stars(data);
    } catch (error) {
        console.error('Error:', error);
    }
}


function showProducts(products) {
    const fecha = new Date().toLocaleString('es-ES', {
        hour12: false,
    });
    for (let i = 0; i < products.length; i++) {
        const listProduct = document.createElement('div');
        listProduct.classList.add('list-group-item', 'list-group-item-action', 'cursor-active');
        const tituloCorto = cutString(products[i].title);
        listProduct.innerHTML = `
            <h4><strong>${tituloCorto}</strong></h4>
            <p class="puntuacion">Puntuación: ${'<span class="fa fa-star estrella"></span>'.repeat(5)}</p>
            <p>Fecha: ${fecha} </p>
        `;
        list[0].appendChild(listProduct);
    }
}

function stars(cantidad) {
    const estrellas = document.querySelectorAll('.puntuacion');

    cantidad.forEach((producto, index) => {
        const rating = producto.rating.rate;
        const estrellasProducto = estrellas[index].querySelectorAll('.estrella');

        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                estrellasProducto[i].classList.add('checked');
            } else {
                estrellasProducto[i].classList.remove('checked');
            }
        }
    });
}

function cutString(producto) {
    if (producto.length > 20) {
        return producto.substring(0, 20) + '...';
    } else {
        return producto;
    }
}