import axios from "axios"
import { useState } from "react"
import ListadoDeProductos from "../Productos/ListadoDeProductos"
import { urlProductos } from "../Utils/endpoinds"

export default function IndiceOfertas() {

    const [ofertas, setOfertas] = useState({})

    useState(() => {
        axios.get(urlProductos)
            .then((respuesta) => {
                setOfertas(respuesta.data)
                console.log(respuesta.data)
            })
    })
    
    return (
        <>
            <h3>Indice Ofertas</h3>
            <ListadoDeProductos productos={ofertas.ofertas}/>
        </>
    )
}