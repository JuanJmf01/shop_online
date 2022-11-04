import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ListadoDeProductos from "../Productos/ListadoDeProductos"
import { urlProductos } from "./endpoinds"

export default function Productos() {

    const [productos, setProductos] = useState({})

    useEffect(() => {
        axios.get(urlProductos)
            .then((respuesta) => {
                setProductos(respuesta.data)
                console.log(respuesta.data)
            })
    }, [])

    return (
        <>
            <br />
            <h3>Productos</h3>
            <br />
            <ListadoDeProductos productos={productos.productos} />
            <br />
            <h3>Ofertas</h3>
            <ListadoDeProductos productos={productos.ofertas} />

        </>
    )
}