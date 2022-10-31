import axios from "axios"
import { Formik, Form, Field } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import Button from "../Button"
import Cargando from "../Cargando"
import { urlVendedores } from "../endpoinds"
import Input from "../Input"
import Model from "../Models/Model"

export default function FiltroVendedores() {

    const [vendedores, setVendedores] = useState([])
    const [vendedor, setVendedor] = useState(false)
    const [domiDisponible, setDomiDisponible] = useState(false)
    const [vendedorDisponible, setVendedorDisponible] = useState(true)
    const [stateVendedor, setStateVendedor] = useState(false)

    const valorInicial = {
        nombres: '',
        apellidos: '',
        stateVendedor: false
    }

    useEffect(() => {
        filtrar(valorInicial)
    }, [])

    function VendedorUnico(id) {
        axios.get(`${urlVendedores}/${id}`)
            .then((respuesta) => {
                setVendedor(respuesta.data)
                console.log(respuesta.data)
            })
    }

    function filtrar(valores) {
        axios.get(`${urlVendedores}/filtrar`, { params: valores })
            .then((respuesta) => {
                setVendedores(respuesta.data)
            })
    }

    return (
        <>
            <h3>Filtro vendedores</h3>
            <Formik initialValues={valorInicial}
                onSubmit={async valores => {
                    filtrar(valores)
                }}
            >

                {(formikProps) => (
                    <Form>
                        <Input label='Nombres' campo='nombres' type='text' placeholder="Nombres" />
                        <Input label='Apellidos' campo='apellidos' type='text' placeholder="Apellidos" />
                        <Field className='form-check-input' id='stateVendedor' name='stateVendedor' type='checkbox' />
                        <label htmlFor="">¿Activo? ¿Inactivo?</label>

                        <div style={{ display: 'flex' }}>
                            <Button className='btn btn-primary'
                                type='submit'
                            >Buscar</Button>
                            <Button className='btn btn-danger'
                                type='submit'
                                onClick={() => {
                                    formikProps.setValues(valorInicial)
                                    filtrar(valorInicial)
                                }}
                            >Limpiar</Button>
                        </div>
                    </Form>
                )}
            </Formik>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {vendedores?.map(vendedor =>
                        <tr key={vendedor.id}>
                            <td>{vendedor.nombres} {vendedor.apellidos}</td>
                            <td>
                                <Button
                                    className='btn btn-primary'
                                    type='submit'
                                    onClick={() => {
                                        setVendedorDisponible(vendedor.stateVendedor)
                                        setDomiDisponible(vendedor.stateVendedor)
                                        setStateVendedor(true)
                                        VendedorUnico(vendedor.id)
                                    }}>
                                    Ver</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {stateVendedor ? <Model title="Informacion vendedor">

                {vendedor ? <div>
                    <div className="model">
                        <div>
                            <h5>Nombres:</h5>
                            <label>{vendedor.nombres}</label>
                        </div>
                        <div>
                            <h5>Apellidos:</h5>
                            <label>{vendedor.apellidos}</label>
                        </div>

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

                        <hr />
                        <div>
                            <h5>WhatsApp:</h5>
                            <a href={`https://wa.me/${vendedor.numeroCelular}`} target="_blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/2504/2504957.png"
                                    className="logo" />
                            </a>
                        </div>
                        <div>
                            <h5>Redes sociales:</h5>
                            <a href={vendedor.instagram} target="_blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                                    className="logo" />
                            </a>
                            <a href={vendedor.facebook} target="_blank">
                                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                                    className="logo" />
                            </a>
                        </div>

                    </div>
                </div> : <Cargando />}


                <Button className='btn btn-danger'
                    type='submit'
                    onClick={() => !setStateVendedor()}>
                    Cerrar</Button>
            </Model> : null}

        </>
    )
}