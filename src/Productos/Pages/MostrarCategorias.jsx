import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { urlProductos } from "../../Utils/endpoinds";
import FormularioProductos from "../FormularioProductos";

const categoriasTwo = [
    {
        id: 1,
        nombre: 'primera'
    },
    {
        id: 2,
        nombre: 'Sehunda'
    },
    {
        id: 3,
        nombre: 'Tercera'
    }
]

export default function MostrarCategorias() {

    const [mostrargeneros, setMostrarGeneros] = useState()
    const [productosNoSeleccionados, setProductosNoSeleccionados] = useState([])


    useEffect(() => {
        cargarDatos()
    }, [])

    function cargarDatos() {
        axios.get(`${urlProductos}/postget`)
            .then((respuesta) => {
                setProductosNoSeleccionados(respuesta.data.categorias)
                console.log('.categorias')
                console.log(respuesta.data.categorias)
                
            })
    }

    return (
        <>
            <h3>Indice Categorias</h3>
            {console.log('prueba')}
            {console.log(productosNoSeleccionados)}


            <FormularioProductos
                productosNoSeleccionados={productosNoSeleccionados}
                productosSeleccionados={productosNoSeleccionados}
                modelo={{


                }}
                onSubmit={async valores => {
                    //await crear(valores)
                    console.log(valores)
                }}
            />



        </>
    )
}