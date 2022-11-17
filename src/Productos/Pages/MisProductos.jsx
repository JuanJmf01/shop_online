import axios from "axios"
import { useEffect, useState } from "react"
import AlertaContext from "../../Utils/AlertaContext"
import { urlProductos } from "../../Utils/endpoinds"
import ListadoDeMisProductos from "../Components/ListadoDeMisProductos"

export default function MisProductos() {
    
    const [misProductos, setMisProductos] = useState({})

    useEffect(() => {
        cargarProductos()
    }, [])

    function cargarProductos() {
        axios.get(`${urlProductos}/MisProductos/${1}`)
            .then((respuesta) => {
                setMisProductos(respuesta.data)
                console.log(respuesta.data)
            })
    }

    return (
        <>
            <AlertaContext.Provider value={() => cargarProductos()}>
                <br />
                <h3>Mis Productos</h3>
                <br />
                <ListadoDeMisProductos productos={misProductos.productos} />
                <br />
                <h3>Oferta</h3>
                <ListadoDeMisProductos productos={misProductos.ofertas} />
            </AlertaContext.Provider>
        </>
    )
}