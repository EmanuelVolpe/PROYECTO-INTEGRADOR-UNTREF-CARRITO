import { generar } from './details.js';

let carritoParseado = JSON.parse(localStorage.getItem('carrito'));
console.log(carritoParseado);

const mostrar = function (data) {
    const main = document.querySelector('#main');
    data.forEach(({ id, producto, precio, imagen }) => {
        const card = template(id, producto, precio, imagen);
        main.appendChild(card);
    });
};

const template = function (id, producto, precio, imagen) {
    const card = generar('div', { className: 'card' });
    card.setAttribute('data-id', id);
    const image = generar('img', {
        src: imagen,
        alt: `Imagen del producto ${producto}`
    });
    const name = generar('h2', { innerHTML: producto, className: 'name' });
    const price = generar('p', { innerHTML: `$ ${parseFloat(precio).toFixed(2)}`, className: 'price' });
    card.append(name, image, price);
    return card;
};


const btnInicio = document.querySelector('#btnAProductos');
btnInicio.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../index.html';
});

mostrar(carritoParseado);