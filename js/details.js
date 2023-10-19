/* eslint-disable no-undef */
const idProductoSeleccionado = parseInt(location.search.split('=', 2)[1]);
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

async function traerDatos(miArchivo) {
    try {
        const respuesta = await fetch(miArchivo, {
            method: 'GET'
        });
        if (respuesta.ok) {
            const datos = await respuesta.json();
            return datos;
        } else {
            throw new Error('La solicitud no se pudo completar: ' + respuesta.status);
        }
    } catch (error) {
        console.error('Error al obtener los datos JSON:', error);
        throw error;
    }
}

const productoBuscado = (productos, idProductoSeleccionado) => {
    const elem = productos.find(producto => producto.id === idProductoSeleccionado);
    return elem;
};


const mostrar = function (id, producto, descripcion, precio, imagen) {
    const main = document.querySelector('#main');
    const product = template(id, producto, descripcion, precio, imagen);
    main.appendChild(product);
};

const generar = (etiqueta, propiedades) => {
    const elemento = document.createElement(etiqueta);
    Object.keys(propiedades).forEach(
        (prop) => (elemento[prop] = propiedades[prop])
    );
    return elemento;
};

const template = (id, producto, descripcion, precio, imagen) => {
    const card = generar('div', { className: 'card' });
    card.setAttribute('data-id', id);
    const image = generar('img', {
        src: imagen,
        alt: `Imagen del producto ${producto}`
    });
    const name = generar('h3', { innerHTML: producto, className: 'name' });
    const description = generar('p', { innerHTML: descripcion, className: 'descripcion' });
    const price = generar('p', { innerHTML: `$ ${parseFloat(precio).toFixed(2)}`, className: 'price' });
    const btnComprar = generar('button', { innerHTML: 'Comprar' });
    card.append(image, name, description, price, btnComprar);
    return card;
};

const agregarAlCarrito = (event, producto) => {
    event.preventDefault();
    const yaExiste = carrito.some(element => {
        return element.id === producto.id;
    });
    if (!yaExiste) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        Swal.fire({
            icon: 'success',
            title: 'Genial!!!',
            text: 'Producto agregado al Carrito con éxito'
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Oops...',
            text: 'El producto ya se encuentra en el Carrito'
        });
    }
};

function crearBotonAgregar(producto) {
    const btnAgregarCarrito = document.querySelector('button');
    btnAgregarCarrito.addEventListener('click', async function (event) {
        agregarAlCarrito(event, producto);
    });
}

traerDatos('../data/products.json')
    .then(data => {
        const product = productoBuscado(data, idProductoSeleccionado);
        const { id, producto, precio, imagen, descripcion } = product;
        mostrar(id, producto, descripcion, precio, imagen, descripcion);
        crearBotonAgregar(product);
    })
    .catch(error => {
        console.error('Error al obtener y mostrar los datos JSON:', error);
    });

export { generar };