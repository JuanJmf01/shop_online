import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cargando from "../../Utils/Cargando";
import { urlProductos } from "../../Utils/endpoinds";
import { convertirProductoAFormData } from "../../Utils/FormDataUtils";
import FormularioProductos from "../FormularioProductos";

export default function EditarProducto() {

    const [producto, setProducto] = useState()
    const [productoPutGet, setProductoPutGet] = useState()
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${urlProductos}/PutGet/${id}`)
            .then((respuesta) => {
                const modelo = {
                    oferta: respuesta.data.producto.oferta,
                    nombre: respuesta.data.producto.nombre,
                    precio: respuesta.data.producto.precio,
                    descripcion: respuesta.data.producto.descripcion,
                    cantidadDisponible: respuesta.data.producto.cantidadDisponible,
                    disponible: respuesta.data.producto.disponible,
                    imagenProducto: respuesta.data.producto.imagenProducto,

                }
                setProducto(modelo)
                setProductoPutGet(respuesta.data)
                console.log(respuesta.data)
            })
    }, [id])

    async function editar(productoEditar) {
        try {
            const formData = convertirProductoAFormData(productoEditar)
            await axios({
                method: 'put',
                url: `${urlProductos}/${id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
        }
        catch (error) {
            console.log(error.response.data)
            //setErrores(error.response.data)
        }
    }

    return (
        <>
            {producto ?
                <div>
                    <h3>Editar producto</h3>
                    {/* <h4>{productoPutGet.producto.vendedores[0].id}</h4> */}

                    <FormularioProductos
                        oferta={producto.oferta}
                        categoriasNoSeleccionadas={productoPutGet.categoriasNoSeleccionadas}
                        categoriasSeleccionadas={productoPutGet.categoriasSeleccionadas}
                        modelo={producto}
                        onSubmit={async valores => {
                            await editar(valores)
                            console.log(valores)
                            navigate('/misProductos')
                        }}
                    />
                </div> : <Cargando />}
        </>
    )
}