import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AutenticationContextt } from "../../App"
import AlertaContext from "../../Utils/AlertaContext"
import { urlProductos, urlUsuarios, urlVendedores } from "../../Utils/endpoinds"
import ListadoDeMisProductos from "../Components/ListadoDeMisProductos"

export default function MisProductos() {

    const { claims } = useContext(AutenticationContextt)

    const [vendedor, setVendedor] = useState()
    const [misProductos, setMisProductos] = useState({})

    function obtenerNombreUsuario() {
        return claims.filter(x => x.nombre === 'email')[0]?.valor
    }

    function obtenerVendedor() {
        axios.get(`${urlVendedores}/${obtenerNombreUsuario()}`)
            .then((respuesta) => {
                setVendedor(respuesta.data.id)
            })
    }

    function cargarProductos() {
        axios.get(`${urlProductos}/MisProductos/${vendedor}`)
            .then((respuesta) => {
                setMisProductos(respuesta.data)
            })
    }


    useEffect(() => {
        obtenerVendedor()
        cargarProductos()
    }, [vendedor])


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