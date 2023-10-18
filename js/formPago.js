document.addEventListener('DOMContentLoaded', function () {
    /* eslint-disable no-undef */

    // Verifica que no hay inputs vacios en el formulario de pago
    const verificarInputsVacios = () => {
        const entradas = document.querySelectorAll('input');
        let tieneCamposVacios = false;
        entradas.forEach(entrada => {
            if (entrada.value.trim() === '') {
                tieneCamposVacios = true;
                Swal.fire({
                    icon: 'warning',
                    title: 'Datos Incompletos',
                    text: 'Falta/n ingresar uno o más datos'
                });
            }
        });
        return tieneCamposVacios;
    };

    // Reseta los inputs una vez enviado el formulario
    const resetearInputs = () => {
        const entradas = document.querySelectorAll('input');
        entradas.forEach(entrada => {
            entrada.value = '';
        });
    };

    //envia el formulario y remueve el carrito del localStorage
    const btnPagar = document.querySelector('#btnPagar');
    btnPagar.addEventListener('click', (event) => {
        event.preventDefault();
        const camposVacios = verificarInputsVacios();
        if (!camposVacios) {
            Swal.fire({
                icon: 'success',
                title: 'Genial!!!',
                text: 'Su pago se realizó con éxito'
            });
        }
        resetearInputs();
        localStorage.removeItem('carrito');
    });
});