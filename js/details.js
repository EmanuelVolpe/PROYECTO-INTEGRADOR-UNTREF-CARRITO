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

/* Agrega cada elemento li a la ul del DOM */
const mostrar = function (id, producto, descripcion, precio, imagen) {
    const lista = document.querySelector('#lista');
    const itemList = template(id, producto, descripcion, precio, imagen);
    lista.appendChild(itemList);
};

const template = function (id, producto, descripcion, precio, imagen) {
    const item = generar('li', { className: 'producto' });
    item.setAttribute('data-id', id);
    const name = generar('p', { innerHTML: producto, className: 'name' });
    const description = generar('p', { innerHTML: descripcion, className: 'descripcion' });
    const price = generar('p', { innerHTML: `$ ${parseFloat(precio).toFixed(2)}`, className: 'precio' });
    const image = generar('img', {
        src: imagen,
        alt: `Imagen del producto ${producto}`
    });
    const btnVolver = generar('button', { innerHTML: 'Volver', onclick: volver });
    const btnAgregarAlCarrito = generar('button', {
        innerHTML: 'Agregar al Carrito',
        className: 'btnAgregarCarrito'
    });
    const btnVerCarrito = generar('button', { innerHTML: 'Ver Carrito', onclick: verCarrito });
    item.append(name, description, price, image, btnVolver, btnAgregarAlCarrito, btnVerCarrito);
    return item;
};

/* Genera dinamicamente un tipo de elemento HTML en funcion de la etiqueta y las propiedades */
const generar = (etiqueta, propiedades) => {
    const elemento = document.createElement(etiqueta);
    Object.keys(propiedades).forEach(
        (prop) => (elemento[prop] = propiedades[prop])
    );
    return elemento;
};

traerDatos('../data/products.json')
    .then(data => {
        const producto = productoBuscado(data, idProductoSeleccionado);
        mostrar(producto.id, producto.producto, producto.descripcion, producto.precio, producto.imagen);
        crearBotonAgregar(data, idProductoSeleccionado);
    })
    .catch(error => {
        console.error('Error al obtener y mostrar los datos JSON:', error);
    });

/*Agrega el producto al arreglo Carrito*/
const agregarAlCarrito = (event, producto) => {
    event.preventDefault();
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log(JSON.parse(localStorage.getItem('carrito')));
    //console.log(carrito);
    //const productoAgregado = carrito.find((producto) => producto.id === idProductoSeleccionado);
};

function crearBotonAgregar(datos, idBuscado) {
    const btnAgregarCarrito = document.querySelector('.btnAgregarCarrito');
    btnAgregarCarrito.addEventListener('click', async function (event) {
        const producto = datos.find(producto => producto.id === idBuscado);
        console.log(producto);
        if (producto) {
            agregarAlCarrito(event, producto);
        }
    });
}

/* Botón para volver al Index */
const volver = function (event) {
    event.preventDefault();
    window.location.href = '../index.html';
};

/* Botón para ir al Carrito */
const verCarrito = function (event) {
    event.preventDefault();
    window.location.href = './cart.html';
};

console.log(JSON.parse(localStorage.getItem('carrito')));
console.log('Array Carrito:' + carrito.length);

export { generar };