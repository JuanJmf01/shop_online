import axios from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import Button from "../Utils/Button"
import Cargando from "../Utils/Cargando"
import { urlVendedores } from "../Utils/endpoinds"
import Input from "../Utils/Input"

export default function InformacionNegocio() {

    const [vendedor, setVendedor] = useState()
    const id = 1

    useEffect(() => {
        axios.get(`${urlVendedores}/${id}`)
            .then((respuesta) => {
                setVendedor(respuesta.data)
                console.log(respuesta.data)
            })
    }, [])

    return (
        <>
            {vendedor ? <div>
                <h3>Informacion de negocio</h3>
                <br />
                <Formik initialValues={{
                    nombreNegocio: vendedor.nombreNegocio,
                    descripcionNegocio: vendedor.descripcionNegocio,
                    facebook: vendedor.facebook,
                    instagram: vendedor.instagram

                }}
                    onSubmit={async valores => {
                        console.log(valores)
                    }}
                >

                    {(formikProps) => (
                        <Form>
                            <div>
                                <Input
                                    type='text'
                                    campo='nombreNegocio'
                                    label='Nombre de negocio' />
                            </div>
                            <div>
                                <Input
                                    type='text'
                                    campo='descripcionNegocio'
                                    label='Descripcion de negocio' />
                            </div>
                            <br />
                            <hr />
                            <div>
                                <h5>Redes sociales</h5>
                                <div>
                                    <label htmlFor="">Instagram</label>
                                    <a href={vendedor.instagram} target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                                            style={{ width: '25px', float: 'right' }} />
                                    </a>
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="">Facebook</label>
                                    <a href={vendedor.facebook} target="_blank">
                                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                                            style={{ width: '25px', float: 'right' }} />
                                    </a>
                                </div>
                                <hr />
                                <h4>Medios de pago</h4>
                                <br />
                            </div>



                            <Button disabled={formikProps.isSubmitting}
                                className='btn btn-primary'
                                type='submit'>
                                Guardar</Button>


                        </Form>
                    )}

                </Formik>
            </div>
                : <Cargando />}
        </>
    )
}