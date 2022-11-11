import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Button from "./Button"
import Cargando from "./Cargando"
import { urlUsuarios, urlVendedores } from "./endpoinds"
import Model from "./Models/Model"

export default function TablaFiltroUsuarios(props) {

    const [usuario, setUsuario] = useState([])
    const [stateModelUsuario, setStateModelUsuario] = useState(false)
    const [esVendedor, setEsVendedor] = useState(false)
    const [vendedorDisponible, setVendedorDisponible] = useState(false)
    const [domiDisponible, setDomiDisponible] = useState(false)

    useEffect(() => {
        setEsVendedor(props.esVendedor)                      // Si es vendedor
    }, [esVendedor])


    function domiciliarioUnico(id) {
        axios.get(`${urlUsuarios}/${id}`)
            .then((respuesta) => {
                setUsuario(respuesta.data)
                //console.log(respuesta.data)
            })
    }

    function vendedorUnico(id) {
        axios.get(`${urlVendedores}/${id}`)
            .then((respuesta) => {
                setUsuario(respuesta.data)
            })
    }

    return (
        <>
            <table className='table table-striped mt-3'>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.usuarios?.map(usuario =>
                        <tr key={usuario.id}>
                            <td>{usuario.nombres} {usuario.apellidos}</td>
                            <td>
                                <button
                                    className='btn btn-outline-secondary mt-1'
                                    type='submit'
                                    onClick={() => {

                                        { esVendedor ? vendedorUnico(usuario.id) : domiciliarioUnico(usuario.id) }
                                        setStateModelUsuario(props.estadoUsuario)            // Abrir model
                                        setVendedorDisponible(usuario.stateVendedor)         // Si el vendedor esta disponible
                                        setDomiDisponible(usuario.stateDomiciliario)         // Si el usuario tiene activo el estado de domiciliario
                                    }}>
                                    Ver</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>


            {stateModelUsuario ? <Model title="Informacion Domiciliario">
                {usuario ? <div>
                    <div className="model">
                        <div>
                            <h5>Nombres:</h5>
                            <label>{usuario.nombres}</label>
                        </div>
                        <div>
                            <h5>Apellidos:</h5>
                            <label>{usuario.apellidos}</label>
                        </div>
                        <div>
                            <h5>Domiciliario disponible:</h5>
                            <label>
                                <input
                                    className="form-check-input"
                                    type='checkbox' onChange={() => setDomiDisponible()}
                                    checked={domiDisponible}
                                    disabled />
                            </label>
                        </div>

                        {esVendedor ? <>
                            <div>
                                <h5>Vendedor disponible:</h5>
                                <label>
                                    <input
                                        className="form-check-input"
                                        type='checkbox' onChange={() => setVendedorDisponible()}
                                        checked={vendedorDisponible}
                                        disabled />
                                </label>
                            </div>
                            <hr />

                            <div>
                                <h5>WhatsApp:</h5>
                                <a href={`https://wa.me/${usuario.numeroCelular}`} target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/2504/2504957.png"
                                        className="logo" />
                                </a>
                            </div>
                            <div>
                                <h5>Redes sociales:</h5>
                                <a href={usuario.instagram} target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                                        className="logo" />
                                </a>
                                <a href={usuario.facebook} target="_blank">
                                    <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                                        className="logo" />
                                </a>
                            </div>
                        </> : null}


                    </div>

                </div> : <Cargando />}

                <Button className='btn btn-danger'
                    type='submit'
                    onClick={() => !setStateModelUsuario()}>
                    Cerrar</Button>
            </Model> : null}
        </>
    )
}