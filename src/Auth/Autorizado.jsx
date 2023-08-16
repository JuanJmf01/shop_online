import { useContext, useEffect, useState } from "react"
import React from "react"
import { AutenticationContextt } from "../App"

function Autorizado(props) {
    const [estaAutorizado, setEstaAutorizado] = useState(false)
    const { claims } = useContext(AutenticationContextt)

    useEffect(() => {
        //Si hay un rol presente, identificamos a travez de los claims si el usuario tiene dicho rol 
        if (props.role) {
            const indice = claims.findIndex(claim =>
                claim.nombre === 'role' && claim.valor === props.role)
            setEstaAutorizado(indice > -1)
        } else {
            //Si no tiene rol no esta autenticado por lo tanto no tiene claims
            setEstaAutorizado(claims.length > 0)
        }
    }, [claims, props.role])

    return (
        <>
            {estaAutorizado ? props.autorizado : props.noAutorizado}
        </>
    )
}

export default Autorizado