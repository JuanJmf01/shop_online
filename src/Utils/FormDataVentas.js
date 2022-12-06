
// Como queremos mandar una imagen utilizamos FromForm, pero necesitamos mandar
// Esta informacion en FormDate por lo tanto convertimos la demas informacion


export function FormDataVentas(producto) {
    const formData = new FormData() 

    if (producto.id) {
        formData.append("id", producto.id)
    }
    if (producto.total) {
        formData.append("total", producto.total)
    }
    if(producto.cantidad){
        formData.append('cantidad', producto.cantidad)
    }
    if (producto.esCliente) {
        formData.append("esCliente", producto.esCliente)
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
    if (producto.imagenComprobante) {
        formData.append("imagenComprobante", producto.imagenComprobante)
    }
    if (producto.fecha) {
        formData.append("fecha", formatearFecha(producto.fecha));
    }


    return formData
}


function formatearFecha(date) {
    date = new Date(date)
    const formato = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    // Hacemos una reconstruccion. (Separamos mes, dia y año)
    // Para finalmente retornar la fecha como lo deseamos
    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }
    ] = formato.formatToParts(date)

    return `${year}-${month}-${day}`
    }


