
// Como queremos mandar una imagen utilizamos FromForm, pero necesitamos mandar
// Esta informacion en FormDate por lo tanto convertimos la demas informacion


export function FormDataComprobantePago(producto) {
    const formData = new FormData() 

    if (producto.id) {
        formData.append("id", producto.id)
    }

    if (producto.imagenComprobante) {
        formData.append("imagenComprobante", producto.imagenComprobante)
    }


    return formData
}
