const btnPagar = document.querySelector('#btnPagar');
btnPagar.addEventListener('click', (event) => {
    event.preventDefault();
    Swal.fire({
        icon: 'success',
        title: 'Genial!!!',
        text: 'Su pago se realizó con éxito'
    });
});