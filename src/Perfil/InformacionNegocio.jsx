import axios from "axios"
import { Form, Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import { AutenticationContextt } from "../App"
import AlertaContext from "../Utils/AlertaContext"
import Button from "../Utils/Button"
import Cargando from "../Utils/Cargando"
import confirmar from "../Utils/ConfirmarAccion"
import { urlMedioPago, urlProductos, urlUsuarios, urlVendedores } from "../Utils/endpoinds"
import { FormDataMedioPago } from "../Utils/FormDataMedioPago"
import FormGroupImagen from "../Utils/FormGroupImagen"
import Input from "../Utils/Input"
import Model from "../Utils/Models/Model"

export default function InformacionNegocio() {

    const [vendedor, setVendedor] = useState()

    const { claims } = useContext(AutenticationContextt)
    const alerta = useContext(AlertaContext)

    const nombreUsuario = claims.filter(x => x.nombre === 'email')[0]?.valor

    const [model, setModel] = useState(false)
    const [mediosDePago, setMediosDePago] = useState(false)

    async function obtenerIdUsuario(email) {
        try {
            await axios.get(`${urlVendedores}/${email}`)
                .then((respuesta) => {
                    obtenerDatosVendedor(respuesta.data.id)
                    obtenerMediosDePago(respuesta.data.id)
                })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    function obtenerDatosVendedor(id) {
        axios.get(`${urlVendedores}/${id}`)
            .then((respuesta) => {
                setVendedor(respuesta.data)
                console.log(respuesta.data)
            })
    }

    function obtenerMediosDePago(id) {
        axios.get(`${urlMedioPago}/${id}`)
            .then((respuesta) => {
                setMediosDePago(respuesta.data)
                console.log(respuesta.data)
            })
    }


    async function crearMedioPago(valor) {
        try {
            const formData = FormDataMedioPago(valor)
            await axios({
                method: 'post',
                url: urlMedioPago,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((respuesta) => {
                console.log(respuesta.data)
            })
            Swal.fire({ icon: 'success', title: 'Medio de pago agregado' })
            setModel(false)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    function borrarMedioPago(id) {
        axios.delete(`${urlMedioPago}/${id}`)
    }

    useEffect(() => {
        obtenerIdUsuario(nombreUsuario)
    }, [nombreUsuario])


    return (
        <>
            {vendedor ? <div className="container-fluid col-8 mt-5">
                <h3>Informacion de negocio</h3>
                <br />
                <div className="border border-secondary rounded-3 shadow mb-5 bg-body rounded">
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
                            <Form className="p-4">
                                <div>
                                    <Input
                                        type='text'
                                        campo='nombreNegocio'
                                        label='Nombre de negocio'
                                        placeholder="Añadir nombre de negocio" />
                                </div>
                                <br />
                                <div>
                                    <Input
                                        type='text'
                                        campo='descripcionNegocio'
                                        label='Descripcion de negocio'
                                        placeholder="Añadir descripcion de negocio" />

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
                                    <div style={{ display: "flex" }}>
                                        <h4 style={{ paddingRight: "15px" }}>Medios de pago</h4>
                                        <Button
                                            className="btn btn-success"
                                            onClick={() => setModel(true)}

                                        > Agregar </Button>
                                    </div>
                                    <br />

                                    <div className="card-group">
                                        {mediosDePago ?
                                            mediosDePago?.map(medioPago =>
                                                <div style={{ marginRight: "13px" }}>
                                                    <div class="card" style={{ width: "8rem", display: "flex" }}>
                                                        <img style={{ width: "75px", height: "75px", marginLeft: "24px", marginTop: "13px" }}
                                                            class="card-img-top" src={medioPago.imagenMedioPago}
                                                            alt="Card image cap"
                                                        />
                                                        <div className="card-body">
                                                            <h6 style={{ marginLeft: "12.4px", marginTop: "-6px" }} class="card-title">Card title</h6>
                                                        </div>
                                                        <div style={{ marginLeft: "26px", marginBottom: "10px", marginTop: "-13px" }} >
                                                            <Button className="btn btn-outline-danger btn-sm"
                                                                onClick={() => confirmar(() => borrarMedioPago(medioPago.id))}
                                                            >Eliminar</Button>
                                                        </div>
                                                    </div>
                                                </div>

                                            ) : <Cargando />
                                        }
                                    </div>


                                    <br />
                                </div>

                                <Button disabled={formikProps.isSubmitting}
                                    className='btn btn-primary'
                                    type='submit'>
                                    Guardar</Button>

                            </Form>
                        )}
                    </Formik>

                    {model ? <Model title="Agregar medio de apgo">
                        <Formik initialValues={{
                            nombre: '',
                            imagenMedioPago: '',
                            clienteId: 1,
                            vendedorId: ''
                        }}

                            onSubmit={async valores => {
                                valores.vendedorId = vendedor.id
                                console.log(valores)
                                crearMedioPago(valores)
                            }}

                        >

                            {(formikProps) => (
                                <Form>
                                    <div>
                                        <Input type="text" campo="nombre" label="Nombre" placeholder="Nombre medio de pago" />
                                    </div>
                                    <FormGroupImagen campo='imagenMedioPago'
                                        tamaño="95px"
                                        label="Imagen Medio de pago"
                                    />
                                    <br />

                                    <div className="btns">
                                        <Button disabled={formikProps.isSubmitting} type="submit"
                                            className="btn btn-primary"
                                        >Agregar</Button>
                                        <Button className="btn btn-danger" onClick={() => setModel(false)}>Cancelar</Button>
                                    </div>
                                </Form>
                            )}

                        </Formik>

                    </Model> : null}

                </div>
            </div>
                : <Cargando />}
        </>
    )
}