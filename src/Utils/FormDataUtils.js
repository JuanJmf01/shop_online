
// Como queremos mandar una imagen utilizamos FromForm, pero necesitamos mandar
// Esta informacion en FormDate por lo tanto convertimos la demas informacion


export function convertirProductoAFormData(producto) {
    const formData = new FormData()

    // append para agregar nuevo valor
    formData.append('oferta', producto.oferta)
    formData.append('nombre', producto.nombre)
    formData.append('precio', producto.precio)
    formData.append('disponible', producto.disponible)
    formData.append("cantidadDisponible", producto.cantidadDisponible)

    

    // En estos casos utilizamos if ya que estos campos son opcionales
    //producto.descripcion : viene de los campos(name) de formik
    //'descripcionProducto' : debe ser igual al nombre de base de datos
 

    if (producto.imagenProducto) {
        formData.append("imagenProducto", producto.imagenProducto)
    }
    if(producto.descripcion){
        formData.append('descripcion', producto.descripcion)

    }
    

    formData.append("categoriasIds", JSON.stringify(producto.categoriasIds))
    //formData.append('vendedoresIds', producto.vendedoresIds)
    
    formData.append("vendedoresIds", JSON.stringify(producto.vendedoresIds))



    return formData
}


