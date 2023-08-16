import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import { AutenticationContextt } from "../App"
import Button from "../Utils/Button"
import Cargando from "../Utils/Cargando"
import { urlUsuarios, urlVendedores } from "../Utils/endpoinds"
import FormGroupCheckBox from "../Utils/FormGroupCheckBox"
import Input from "../Utils/Input"

import './css/profile.css'

export default function InformacionPersonal() {

    const [vendedor, setUsuario] = useState()
    const [esVendedor, setEsvendeor] = useState()

    const [stateDomi, setStateDomi] = useState()
    const [stateVendedor, setStateVendedor] = useState()

    const { claims } = useContext(AutenticationContextt)

    const nombreUsuario = claims.filter(x => x.nombre === 'email')[0]?.valor

    async function obtenerIdUsuario(email) {
        try {
            await axios.get(`${urlUsuarios}/${email}`)
                .then((respuesta) => {
                    obtenerDatosUser(respuesta.data.id)
                })
        } catch {
            await axios.get(`${urlVendedores}/${email}`)
                .then((respuesta) => {
                    obtenerDatosVendedor(respuesta.data.id)
                    setEsvendeor(true)
                })
        }
    }

    function obtenerDatosVendedor(id) {
        axios.get(`${urlVendedores}/${id}`)
            .then((respuesta) => {
                setUsuario(respuesta.data)
                setStateDomi(respuesta.data.stateDomiciliario)
                setStateVendedor(respuesta.data.stateVendedor)

                console.log(respuesta.data)
            })
    }

    function obtenerDatosUser(id) {
        axios.get(`${urlUsuarios}/${id}`)
            .then((respuesta) => {
                setUsuario(respuesta.data)
                setStateDomi(respuesta.data.stateDomiciliario)
                console.log(respuesta.data)
            })
    }

    useEffect(() => {
        obtenerIdUsuario(nombreUsuario)
    }, [nombreUsuario])

    return (
        <>
            {vendedor ? <div class="container-fluid col-8 mt-5">
                <h3>Informacion Personal</h3>
                <br />
                <div class="border border-secondary rounded-3 shadow mb-5 bg-body rounded">
                    <Formik initialValues={{
                        nombres: vendedor.nombres,
                        apellidos: vendedor.apellidos,
                        email: vendedor.email,
                        numeroCelular: vendedor.numeroCelular

                    }}
                        onSubmit={async valores => {
                            valores.stateDomiciliario = stateDomi
                            valores.stateVendedor = stateVendedor
                            console.log(valores)
                        }}
                    >

                        {(formikProps) => (
                            <Form className="p-4">
                                <div>
                                    <Input
                                        type='text'
                                        campo='nombres'
                                        label='Nombres' />
                                </div>
                                <div>
                                    <Input
                                        type='text'
                                        campo='apellidos'
                                        label='Apellidos' />
                                </div>

                                <div>
                                    <Input
                                        type='text'
                                        campo='email'
                                        label='Email' />
                                </div>
                                <div>
                                    <Input
                                        type='number'
                                        campo='numeroCelular'
                                        label='Numero de celular' />
                                </div>
                                <br />
                                <div>
                                    <FormGroupCheckBox label='domiciliario activo?'
                                        onChange={((e) => setStateDomi(e.currentTarget.checked))}
                                        checked={stateDomi}
                                        campo='oferta' />
                                </div>
                                {esVendedor ? <div>
                                    <FormGroupCheckBox label='¿Vendedor activo?'
                                        onChange={(e) => setStateVendedor(e.currentTarget.checked)}
                                        checked={stateVendedor}
                                        campo='oferta' />
                                </div> : null}
                                <br />
                                <br />
                                <Button className='btn btn-primary' type='submit'>
                                    Guardar
                                </Button>


                            </Form>
                        )}

                    </Formik>
                </div>

            </div>
                : <Cargando />}
        </>
    )
}

