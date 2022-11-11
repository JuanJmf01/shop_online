import axios from "axios"
import { Formik, Form, Field } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import Button from "../Button"
import { urlUsuarios, urlVendedores } from "../endpoinds"
import Input from "../Input"
import TablaFiltroUsuarios from "../TablaFiltroUsuarios"

export default function FiltroDomiciliarios() {


    const [domiciliarios, setDomiciliarios] = useState([])
    const [vendedores, setVendedores] = useState([])


    const valorInicial = {
        nombres: '',
        apellidos: '',
        stateDomiciliario: false
    }

    useEffect(() => {
        filtrarDomiClientes(valorInicial)
        filtrarDomiVendedores(valorInicial)
    }, [])

    function filtrarDomiClientes(valores) {
        axios.get(`${urlUsuarios}/filtrar`, { params: valores })
            .then((respuesta) => {
                console.log(respuesta.data)
                setDomiciliarios(respuesta.data)
            })
    }

    function filtrarDomiVendedores(valores) {
        axios.get(`${urlVendedores}/filtrar`, { params: valores })
            .then((respuesta) => {
                console.log(respuesta.data)
                setVendedores(respuesta.data)

            })
    }

    return (
        <>
            <div class="container-fluid col-8 mt-3y">
                <h3>Filtro domiciliarios</h3>
                <Formik initialValues={valorInicial}
                    onSubmit={async valores => {
                        filtrarDomiVendedores(valores)
                        filtrarDomiClientes(valores)

                    }}
                >

                    {(formikProps) => (
                        <Form>
                            <Input label='Nombre domiciliario' campo='nombres' type='text' placeholder="Nombre" />
                            <Input label='Apellido domiciliario' campo='apellidos' type='text' placeholder="Apellidos" />
                            <Field className='form-check-input' name='stateDomiciliario' type='checkbox' />
                            <label htmlFor="">¿Activo? ¿Inactivo?</label>

                            <div style={{ display: 'flex' }}>
                                <Button className='btn btn-outline-secondary mt-1'
                                    type='submit'
                                >Buscar</Button>
                                <Button className='btn btn-outline-danger mt-1'
                                    type='submit'
                                    onClick={() => {
                                        formikProps.setValues(valorInicial)
                                        filtrarDomiVendedores(valorInicial)
                                        filtrarDomiClientes(valorInicial)

                                    }}
                                >Limpiar</Button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <br />
                <h4>Domiciliarios</h4>

                <TablaFiltroUsuarios
                    esVendedor={false}
                    usuarios={domiciliarios}
                    estadoUsuario={true}
                />

                <br />

                <br />
                <h4>Vendedores domiciliarios</h4>
                <TablaFiltroUsuarios
                    esVendedor={true}
                    usuarios={vendedores}
                    estadoUsuario={true}

                />
            </div>

        </>
    )
}




