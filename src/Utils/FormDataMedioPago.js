
// Como queremos mandar una imagen utilizamos FromForm, pero necesitamos mandar
// Esta informacion en FormDate por lo tanto convertimos la demas informacion


export function FormDataMedioPago(producto) {
    const formData = new FormData() 

    if (producto.nombre) {
        formData.append("nombre", producto.nombre)
    }
    if (producto.imagenMedioPago) {
        formData.append("imagenMedioPago", producto.imagenMedioPago)
    }
    if (producto.clienteId) {
        formData.append("clienteId", producto.clienteId)
    }
    if (producto.vendedorId) {
        formData.append("vendedorId", producto.vendedorId)
    }



    return formData
}


