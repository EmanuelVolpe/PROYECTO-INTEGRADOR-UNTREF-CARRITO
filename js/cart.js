import { generar } from './details.js';

let carritoParseado = JSON.parse(localStorage.getItem('carrito'));

const mostrar = function (data) {
    const main = document.querySelector('#main');
    data.forEach(({ id, producto, precio, imagen }) => {
        const card = template(id, producto, precio, imagen);
        main.appendChild(card);
    });
};

const template = (id, producto, precio, imagen) => {
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
        value: '1',
        min: '1',
        className: 'input-cantidad',
        onchange: (event) => {
            const subtotal = calcularSubtotal(event, precio);
            actualizarSubtotal(card, subtotal);
            actualizarCostoTotal();
            actualizarCantidadProductos();
        }
    });
    quantity.type = 'number';
    const subt = parseInt(quantity.value) * parseInt(precio);
    const subtotal = generar('h4', { innerHTML: `Subtotal: $ ${subt.toFixed(2)}` });
    const trash = generar('button', {
        innerHTML: 'delete',
        className: 'material-symbols-outlined btn-delete',
        onclick: (event) => quitar(event, id)
    });
    card.append(image, name, price, quantity, subtotal, trash);
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

const quitar = (event, id) => {
    event.preventDefault();
    const productoAQuitar = carritoParseado.find(element => {
        return element.id === id;
    });
    console.log(productoAQuitar);
    console.log(carritoParseado.indexOf(productoAQuitar));
    const indiceProductoAQuitar = carritoParseado.indexOf(productoAQuitar);
    carritoParseado.splice(indiceProductoAQuitar, 1);
    localStorage.setItem('carrito', JSON.stringify(carritoParseado));
    window.location.href = './cart.html';
};

const calcularSuma = (valores) => {
    const total = valores.reduce((acumulador, valor) => {
        return acumulador + valor;
    }, 0);
    return total;
};

const actualizarCostoTotal = () => {
    const costoTotal = document.querySelector('#costoTotal');
    const contenedorMain = document.querySelector('#main');
    const cards = contenedorMain.querySelectorAll('.card');
    const subtotales = [];
    cards.forEach(card => {
        const h4texto = card.childNodes[4].textContent;
        const partes = h4texto.split(' ');
        subtotales.push(parseInt(partes[2]));
    });
    const total = calcularSuma(subtotales);
    costoTotal.innerHTML = total.toFixed(2);
};

const actualizarCantidadProductos = () => {
    const cantDeProductos = document.querySelector('#cantProductos');
    const contenedorMain = document.querySelector('#main');
    const cards = contenedorMain.querySelectorAll('.card');
    const cantidades = [];
    cards.forEach(card => {
        const inputsCant = card.childNodes[3].value;
        cantidades.push(parseInt(inputsCant));
    });
    const cantTotal = calcularSuma(cantidades);
    cantDeProductos.innerHTML = cantTotal;
};

/* const btnInicio = document.querySelector('#btnAProductos');
btnInicio.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../index.html';
}); */

mostrar(carritoParseado);
actualizarCostoTotal();
actualizarCantidadProductos();