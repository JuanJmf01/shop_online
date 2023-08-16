import axios from "axios"
import { Formik, Form, Field } from "formik"
import { useEffect } from "react"
import { useState } from "react"
import Button from "../Button"
import { urlVendedores } from "../endpoinds"
import Input from "../Input"
import TablaFiltroUsuarios from "../TablaFiltroUsuarios"

export default function FiltroVendedores() {

    const [vendedores, setVendedores] = useState([])
    const [vendedor, setVendedor] = useState(false)


    const valorInicial = {
        nombres: '',
        apellidos: '',
        stateVendedor: false
    }

    useEffect(() => {
        filtrar(valorInicial)
    }, [])


    function filtrar(valores) {
        axios.get(`${urlVendedores}/filtrar`, { params: valores })
            .then((respuesta) => {
                console.log(respuesta.data)
                setVendedores(respuesta.data)
            })
    }

    return (
        <>
            <div class="container-fluid col-8 mt-3">
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
                                <Button className='btn btn-outline-secondary mt-1'
                                    type='submit'
                                >Buscar</Button>
                                <Button className='btn btn-outline-danger mt-1'
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

                <TablaFiltroUsuarios
                    esVendedor={true}
                    usuarios={vendedores}
                    estadoUsuario={true}

                />

            </div>


        </>
    )
}