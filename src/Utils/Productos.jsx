import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ListadoDeProductos from "../Productos/ListadoDeProductos"
import { urlProductos } from "./endpoinds"

export default function Productos() {

    const bd = [
        {
            id:1,
            nombre:"choclitos",
            precio:1200,
            categorias:"mekato",
            votoUsuario:5,
            promedioVoto:4,
            numeroCelular:"32254678",
            imagenProducto:""

        },
        {
            id:2,
            nombre:"torta la abuela",
            precio:1200,
            categorias:"mekato",
            votoUsuario:5,
            promedioVoto:4,
            numeroCelular:"32254678",
            imagenProducto:""

        },
        {
            id:3,
            nombre:"torta la abuela",
            precio:1200,
            categorias:"mekato",
            votoUsuario:5,
            promedioVoto:4,
            numeroCelular:"32254678",
            imagenProducto:""

        },
        
    ]
    const [productos, setProductos] = useState(bd)

    useEffect(() => {
        axios.get(urlProductos)
            .then((respuesta) => {
                setProductos(respuesta.data)
                console.log(respuesta.data)
            })
    }, [])
    console.log(productos)
    return (
        <>
            <br />
            <h3>Productos</h3>
            <br />
            <ListadoDeProductos productos={productos} />
            <br />
            <h3>Oferta</h3>
            <ListadoDeProductos productos={productos.ofertas} />

        </>
    )
}