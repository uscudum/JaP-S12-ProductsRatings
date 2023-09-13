const URL = 'https://fakestoreapi.com/products'
const containerProducts = document.getElementById('products');

document.addEventListener("DOMContentLoaded", function (e) {
    fetchData(URL)
})
// Petición a la API
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    
    showProducts(data);
}
//Crea las tarjetas recorriendo cada elemento llamando las funciones stars y cutString, también muestra su información.
function showProducts(products) {
    let date = new Date().toLocaleString();

    for (const element of products) {
        containerProducts.innerHTML += `
           <div class="list-group-item list-group-item-action">
           <div class="row">
               <div class="col">
                   <h6>${cutString(element.title)}</h6><small>${date}</small>
                   ${stars(parseInt(element.rating.rate))}
               </div>
           </div>
           </div>
         ` 
        }
}
// Crea las estrellas segun el rate de la API
function stars(amount) {
    let star = '';
    for (let i = 0; i < amount; i++) {
        star += `<span class="fa fa-star checked"></span>`
    }
    for (let i = amount; i < 5; i++) {
        star += `<span class="fa fa-star"></span>`
    }
    return star;
}
// Acorta el titulo a 20 caracteres
function cutString(string) {
    if (string.length > 20) {
        let title = string.substring(0,20);
        return title + '...';
    }else{
        return string;
    }
}