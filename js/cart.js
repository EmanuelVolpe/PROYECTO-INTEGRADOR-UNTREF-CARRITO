import { generar } from './details.js';

let carritoParseado = JSON.parse(localStorage.getItem('carrito'));

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
        value: '1',
        min: '1',
        className: 'input-cantidad',
        onchange: function (event) {
            const subtotal = calcularSubtotal(event, precio);
            actualizarSubtotal(card, subtotal);
        }
    });
    quantity.type = 'number';
    const subt = parseInt(quantity.value) * parseInt(precio);
    const subtotal = generar('h4', { innerHTML: `Subtotal: $ ${subt.toFixed(2)}` });
    const trash = generar('button', { innerHTML: 'delete', className: 'material-symbols-outlined', onclick: (event) => quitar(event, id) });
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
    /*if (!yaExiste) {
        carritoParseado.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carritoParseado));
        Swal.fire({
            icon: 'success',
            title: 'Genial!!!',
            text: 'Producto eliminado del Carrito con éxito'
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'El producto ya se encuentra en el Carrito'
        });
    }*/
    //console.log(JSON.parse(localStorage.getItem('carrito')));
};


const btnInicio = document.querySelector('#btnAProductos');
btnInicio.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../index.html';
});

mostrar(carritoParseado);