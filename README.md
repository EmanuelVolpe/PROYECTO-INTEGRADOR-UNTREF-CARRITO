# Descripción de las funciones separadas por Archivos
-----------------------------------------------------------------------------------------------
## index.js
### traerDatos:
Trae los datos desde el archivo JSON.

### mostrar:
Agrega cada card al main del DOM.

### template:
Agrega a las cards y los elementos que las componen al DOM.

### generar:
Genera los distintos elemntos con sus propiedades.

### verDetalles
Redirecciona a la pagina detalles del producto con el id del producto seleccionado.


-----------------------------------------------------------------------------------------------
## details.js

### traerDatos:
Trae los datos desde el archivo JSON.

### productoBuscado:
Busca un producto por id.

### mostrar:
Agrga la card del producto seleccionado al main.

### generar:
Idem a generar del archivo index.js.

### template:
Agrega a la card los distintos elementos que la componen.

### agregarAlCarrito:
Agrega el producto al carrito si es que ya no existe en el mismo.

### crearBotonAgregar:
Dispara el evento que va a agregar el prodcuto al carrito.


--------------------------------------------------------------------------------------------------
## cart.js

### mostrar:
Agrega cada card al main del DOM.

### template:
Agrega a la card los distintos elementos que la componen.

### calcularSubtotal:
Retorna el subtotal de cada producto, multiplicando su precio por el valor del input cantidad.

### actualizarSubtotal:
Agrega el subtotal al DOM.

### quitar:
Remueve el producto del carrito.

### calcularSuma:
Suma los valores de un arreglo. Se usará para calcular el total de la suma de los subtotales.

### actualizarCostoTotal:
Agrega el costo total al DOM.

### actualizarCantidadProductos:
Agrega la cantidad total de prodcutos del carrito al DOM.


--------------------------------------------------------------------------------------------------
## formPago.js

### verificarInputsVacios:
Verifica que no haya inputs vacios antes de enviar los datos de pago.

### resetearInputs:
Resetea los inputs una vez que se envian los datos.

### btnPagar:
Desata el evento de pago. Vacía el carrito una vez que se "paga".