import axios from "axios"
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react"
import Button from "../Utils/Button"
import Cargando from "../Utils/Cargando"
import { urlVendedores } from "../Utils/endpoinds"
import FormGroupCheckBox from "../Utils/FormGroupCheckBox"
import Input from "../Utils/Input"

import './css/profile.css'

export default function InformacionPersonal() {

    const [vendedor, setVendedor] = useState()
    const [stateDomi, setStateDomi] = useState()
    const [stateVendedor, setStateVendedor] = useState()


    const id = 1

    /*useEffect(() => {
        axios.get(`${urlVendedores}/${id}`)
            .then((respuesta) => {
                setVendedor(respuesta.data)
                setStateDomi(respuesta.data.stateDomiciliario)
                setStateVendedor(respuesta.data.stateVendedor)

                console.log(respuesta.data)
            })
    }, [])*/

    return (
        <>
            {/*vendedor ?*/ <div class="container-fluid col-8 mt-5">
                <h3>Informacion Personal</h3>
                <br />
                <div class="border border-secondary rounded-3 shadow mb-5 bg-body rounded">
                    <Formik /*initialValues={{
                        nombres: vendedor.nombres,
                        apellidos: vendedor.apellidos,
                        email: vendedor.email,
                        numeroCelular: vendedor.numeroCelular

                    }}
                        onSubmit={async valores => {
                            valores.stateDomiciliario = stateDomi
                            valores.stateVendedor = stateVendedor
                            console.log(valores)
                        }}*/
                    >

                        {/*(formikProps) => (*/
                            <Form className="p-3">
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
                                <div>
                                    <FormGroupCheckBox label='¿Vendedor activo?'
                                        onChange={(e) => setStateVendedor(e.currentTarget.checked)}
                                        checked={stateVendedor}
                                        campo='oferta' />
                                </div>


                                <Button className='btn btn-primary' type='submit'>
                                    Guardar
                                </Button>


                            </Form>
                    /*  )*/}

                    </Formik>
                </div>
                
            </div>
                /*: <Cargando /> */ }
        </>
    )
}

