import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { number } from "yup";
import Cargando from "../../Utils/Cargando";
import { urlProductos } from "../../Utils/endpoinds";
import { convertirProductoAFormData } from "../../Utils/FormDataUtils";
import MostrarErrores from "../../Utils/MostrarErrores";
import FormularioProductos from "../FormularioProductos";

export default function CrearProducto() {

    const [categoriasNoSeleccionadas, setCategoriasNoSeleccionadas] = useState([])
    const [cargado, setCargado] = useState(false)
    const [errores, setErrores] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`${urlProductos}/postget`)
            .then((respuesta) => {
                setCategoriasNoSeleccionadas(respuesta.data.categorias)
                setCargado(true)
            })
    }, [])

    async function crear(producto) {
        try {
            const formData = convertirProductoAFormData(producto)
            await axios({
                method: 'post',
                url: urlProductos,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((respuesta) => {
                console.log(respuesta.data)
            })
        }
        catch (error) {
            setErrores(error.response.data)
            console.log(error.response.data)

        }
    }

    return (
        < div class="container-fluid col-8 mt-5">
            <h3 class="">Crear Productos</h3>
            <div class="border border-secondary rounded-3 shadow mb-5 bg-body rounded">
            {cargado ?

                <FormularioProductos
                    oferta = {false}
                    categoriasNoSeleccionadas={categoriasNoSeleccionadas}
                    categoriasSeleccionadas={[]}
                    modelo={{
                        nombre: '',
                        precio: '',
                        descripcion: '',
                        cantidadDisponible: '',
                        disponible: true,
                        imagenProducto: ''

                    }}
                    onSubmit={async valores => {
                        await crear(valores)
                        //navigate('/misProductos')
                    }}
                /> : <Cargando />}
            </div>
        </div >
    )
}