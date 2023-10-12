import { generar } from './details.js';

let carritoParseado = JSON.parse(localStorage.getItem('carrito'));
console.log(carritoParseado);

const template = (id, producto, precio, imagen) => {
    const item = generar('li', { className: 'producto' });
    item.setAttribute('data-id', id);
    const name = generar('p', { innerHTML: producto, className: 'name' });
    const price = generar('p', { innerHTML: `$ ${parseFloat(precio).toFixed(2)}`, className: 'precio' });
    const image = generar('img', {
        src: imagen,
        alt: `Imagen del producto ${producto}`
    });
    item.append(name, price, image);
    return item;
};

const mostrar = (id, producto, precio, imagen) => {
    const lista = document.querySelector('#lista');
    const itemList = template(id, producto, precio, imagen);
    lista.appendChild(itemList);
};

carritoParseado.forEach(producto => {
    mostrar(producto.id, producto.producto, producto.precio, producto.imagen);
    // Puedes crear elementos HTML para mostrar los productos en la página
});

const btnInicio = document.querySelector('#btnAProductos');
btnInicio.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../index.html';
});