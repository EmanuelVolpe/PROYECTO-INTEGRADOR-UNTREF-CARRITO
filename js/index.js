/* Trae los datos desde el archivo JSON */
async function traerDatos(miArchivo) {
    try {
        const respuesta = await fetch(miArchivo);
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error al obtener los datos JSON:', error);
    }
}

/* Agrega cada elemento li a la ul del DOM */
const mostrar = function (datos) {
    const lista = document.querySelector('#lista');
    datos.forEach(({ id, producto, precio, imagen }) => {
        const itemList = template(id, producto, precio, imagen);
        lista.appendChild(itemList);
    });
};

const template = function (id, producto, precio, imagen) {
    const item = generar('li', { className: 'producto' });
    item.setAttribute('data-id', id);
    const name = generar('p', { innerHTML: producto });
    const price = generar('p', { innerHTML: `$ ${parseFloat(precio).toFixed(2)}`, className: 'precio' });
    const image = generar('img', {
        src: imagen,
        alt: `Imagen del producto ${producto}`
    });
    const btnPlus = generar('button', { innerHTML: 'Agregar', onclick: addCart });
    item.append(name, price, btnPlus, image);
    return item;
};

/* Genera dinamicamente un tipo de elemento HTML en funcion de la etiqueta y las propiedades */
const generar = function (etiqueta, propiedades) {
    const elemento = document.createElement(etiqueta);
    Object.keys(propiedades).forEach(
        (prop) => (elemento[prop] = propiedades[prop])
    );
    return elemento;
};

const addCart = function (e) {
    e.preventDefault();
    const item = e.target.parentElement;
    const id = parseInt(item.dataset.id);
    console.log(id);
};

traerDatos('./data/products.json')
    .then(data => {
        mostrar(data); // Llama a mostrarEnHTML después de que los datos se hayan obtenido correctamente
    })
    .catch(error => {
        console.error('Error al obtener y mostrar los datos JSON:', error);
    });