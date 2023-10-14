import { generar } from './details.js';

let carritoParseado = JSON.parse(localStorage.getItem('carrito'));
//console.log(carritoParseado);

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
    const name = generar('h3', { innerHTML: producto, className: 'name' });
    const price = generar('p', { innerHTML: `$ ${parseFloat(precio).toFixed(2)}`, className: 'price' });
    const quantity = generar('input', {
        name: `cantidad-${id}`,
        onchange: function (event) {
            const subtotal = calcularSubtotal(event, precio);
            actualizarSubtotal(card, subtotal);
        }
    });
    quantity.type = 'number';
    const $st = parseInt(quantity.value) * precio;
    const subtotal = generar('h4', { innerHTML: $st });
    card.append(image, name, price, quantity, subtotal);
    return card;
};

const calcularSubtotal = (event, precio) => {
    let valor = event.target.value;
    if (isNaN(valor) || valor <= 0) {
        valor = 1;
    }
    return valor * precio;
};

const actualizarSubtotal = (card, nuevoSubtotal) => {
    const subtotal = card.querySelector('h4');
    subtotal.innerHTML = `Subtotal: $ ${nuevoSubtotal.toFixed(2)}`;
};


const btnInicio = document.querySelector('#btnAProductos');
btnInicio.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../index.html';
});

mostrar(carritoParseado);