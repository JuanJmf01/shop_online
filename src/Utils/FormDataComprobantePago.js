
// Como queremos mandar una imagen utilizamos FromForm, pero necesitamos mandar
// Esta informacion en FormDate por lo tanto convertimos la demas informacion


export function FormDataComprobantePago(producto) {
    const formData = new FormData() 

    if (producto.imagenComprobante) {
        formData.append("imagenComprobante", producto.imagenComprobante)
    }
    if (producto.clienteId) {
        formData.append("clienteId", producto.clienteId)
    }
    if (producto.vendedorId) {
        formData.append("vendedorId", producto.vendedorId)
    }
    if (producto.productoId) {
        formData.append("productoId", producto.productoId)
    }



    return formData
}
