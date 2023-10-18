document.addEventListener('DOMContentLoaded', function () {
    /* eslint-disable no-undef */

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

    const resetearInputs = () => {
        const entradas = document.querySelectorAll('input');
        entradas.forEach(entrada => {
            entrada.value = '';
        });
    };

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