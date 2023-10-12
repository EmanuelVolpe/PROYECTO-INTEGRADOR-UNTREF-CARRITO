let carritoParseado = JSON.parse(localStorage.getItem('carrito'));
console.log(carritoParseado);

carritoParseado.forEach(producto => {
    console.log(`Producto: ${producto.producto}, Precio: ${producto.precio}`);
    // Puedes crear elementos HTML para mostrar los productos en la página
});

const btnInicio = document.querySelector("#btnAProductos");
btnInicio.addEventListener('click', function (event) {
    event.preventDefault();
    window.location.href = '../index.html';
})