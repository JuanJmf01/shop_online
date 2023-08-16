import axios from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useContext } from "react"
import Swal from "sweetalert2"
import { AutenticationContextt } from "../App"
import Button from "../Utils/Button"
import { urlCompras, urlComprobantePago, urlProductos, urlUsuarios, urlVendedores, urlVentas } from "../Utils/endpoinds"
import { FormDataComprobantePago } from "../Utils/FormDataComprobantePago"
import FormGroupImagen from "../Utils/FormGroupImagen"
import Model from "../Utils/Models/Model"

export default function IndiceCompras() {

    const [enProceso, setEnProceso] = useState([])
    const [compras, setCompras] = useState([])
    const [esCliente, setEsCliente] = useState(true)

    const [vendedor, setVendedor] = useState({})


    const [comprobante, setComprovbante] = useState()
    const [model, setModel] = useState(false)

    const { claims } = useContext(AutenticationContextt)

    const nombreUsuario = claims.filter(x => x.nombre === 'email')[0]?.valor

    var idPro = []
    var idProCompras = []


    async function obtenerUsuario(email) {
        try {
            await axios.get(`${urlUsuarios}/${email}`)
                .then((respuesta) => {
                    allClientesComprasEnProceso(respuesta.data.id)
                    allClientesCompras(respuesta.data.id)
                })
        } catch {
            await axios.get(`${urlVendedores}/${email}`)
                .then((respuesta) => {
                    setEsCliente(false)
                    setVendedor(respuesta.data)
                    console.log("VENDEDORESSS", respuesta.data)
                    allVendedoresComprasEnProceso(respuesta.data.id)
                    allVendedoresCompras(respuesta.data.id)
                })
        }
    }

    async function allClientesComprasEnProceso(id) {
        await axios.get(`${urlCompras}/compradoresCliente/${id}`)
            .then((respuesta) => {
                returnProducto(respuesta.data)
            })
    }

    async function allVendedoresComprasEnProceso(id) {
        await axios.get(`${urlCompras}/compradoresVendedor/${id}`)
            .then((respuesta) => {
                console.log("PRIMERO", respuesta.data)
                returnProducto(respuesta.data)
            })
    }


    async function allClientesCompras(id) {
        await axios.get(`${urlVentas}/misComprasCliente/${id}`)
            .then((respuesta) => {
                returnProductoVendido(respuesta.data)
            })
    }

    async function allVendedoresCompras(id) {
        await axios.get(`${urlVentas}/misComprasVendedor/${id}`)
            .then((respuesta) => {
                returnProductoVendido(respuesta.data)
            })
    }

    async function returnProducto(users) {
        for (var i = 0; i < users.length; i++) {
            var idd = users[i].productoId
            idPro.push(idd)
        }

        producto(idPro)
    }


    async function returnProductoVendido(users) {
        for (var i = 0; i < users.length; i++) {
            var idd = users[i].productoId
            idPro.push(idd)
        }

        productoComprado(idPro)
    }


    async function producto(valores) {
        try {
            axios.post(`${urlCompras}/mostrarProductos`, JSON.stringify(valores),
                {
                    headers: { 'Content-Type': 'application/json' }
                }).then((respuesta) => {
                    console.log("EN PROCESOOOO", respuesta.data)
                    setEnProceso(respuesta.data)
                })

        } catch (error) {
            console.log(error.response.data)
        }
    }

    async function productoComprado(valores) {
        try {
            axios.post(`${urlVentas}/mostrarVentas`, JSON.stringify(valores),
                {
                    headers: { 'Content-Type': 'application/json' }
                }).then((respuesta) => {
                    console.log("COMPRASSSS ", respuesta.data)
                    setCompras(respuesta.data)
                })
        } catch (error) {
            console.log(error.response.data)
        }
    }




    async function crearComprobantePago(valor) {
        try {
            const formData = FormDataComprobantePago(valor)
            await axios({
                method: 'post',
                url: `${urlCompras}/aggComprobante`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((respuesta) => {
                console.log(respuesta.data)
            })
            Swal.fire({ icon: 'success', title: 'Comprobante de pago agregado' })
            setModel(false)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }


    useEffect(() => {
        obtenerUsuario(nombreUsuario)

    }, [nombreUsuario])


    return (
        <>
            <br />
            <h2>Mis Compras</h2>
            <br />
            {compras.length !== 0 ?
                compras.map(producto =>
                    <div style={{ display: "flex" }}>
                        <div className="card" style={{ top: "200", width: "700px", marginBottom: "30px" }}>
                            <div className="card-header" style={{ display: "flex" }}>
                                <div>
                                    <div>
                                        <h4>Vendedor: {producto.vendedor.nombres} {producto.vendedor.apellidos}</h4>
                                    </div>
                                    <div style={{ marginTop: "-30px", float: "right" }}>
                                        <a href={`https://wa.me/${producto.vendedor.numeroCelular}`} target="_blank" rel="noreferrer">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2504/2504957.png" alt="WhatsApp"
                                                className="logo" />
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div className="card-body">
                                <p className="card-text">{producto.descripcion}</p>
                                <div style={{ display: "flex", marginTop: "-10px" }}>
                                    <h5 className="card-title">Producto:</h5>
                                    <p style={{ marginLeft: "15px" }}>{producto.nombre}</p>
                                </div>
                                <div style={{ display: "flex", marginTop: "-10px" }}>
                                    <h6 className="card-title">Precio individual: </h6>
                                    <p style={{ marginLeft: "15px" }}>{producto.precio}</p>
                                </div>
                                <div style={{ display: "flex", marginTop: "-10px" }}>
                                    <h6 className="card-title">Cantidad total comprada: </h6>
                                    <p style={{ marginLeft: "15px" }}>{producto.cantidad}</p>
                                </div>
                                <div style={{ display: "flex", marginTop: "-10px" }}>
                                    <h6 className="card-title">Total pagado: $</h6>
                                    <p style={{ marginLeft: "3px" }}>{producto.total}</p>
                                </div>

                                <img style={{ with: "200px", height: "200px", float: "right", marginTop: "-110px" }}
                                    src={producto.imagenProducto} alt="Producto" />
                            </div>
                        </div>
                        {producto.imagenComprobante ?
                            <div style={{ marginLeft: "30px" }}>
                                <h5>Comprobante</h5>
                                <img style={{ height: "290px", width: "250px" }} src={producto.imagenComprobante} alt="" />
                            </div> : <>No hay comprobantes que mostrar</>}
                    </div>

                )
                : <>No hay ventas para mostrar</>}


            <br />
            <br />
            <h2>Mis pendientes</h2>
            <br />
            {enProceso.length !== 0 ?
                enProceso.map(producto =>
                    <div style={{ display: "flex" }}>
                        <div className="card" style={{ top: "200", width: "700px", marginBottom: "30px" }}>
                            <div className="card-header">
                                <div>
                                    <div>
                                        <h4>Vendedor: {producto.vendedor.nombres} {producto.vendedor.apellidos}</h4>
                                    </div>
                                    <div style={{ marginTop: "-30px", float: "right" }}>
                                        <a href={`https://wa.me/${producto.vendedor.numeroCelular}`} target="_blank" rel="noreferrer">
                                            <img src="https://cdn-icons-png.flaticon.com/512/2504/2504957.png" alt="WhatsApp"
                                                className="logo" />
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Producto: {producto.nombre}</h5>
                                <h6 className="card-title">Precio: {producto.precio}</h6>

                                <p className="card-text">{producto.descripcion}</p>
                                <img style={{ with: "200px", height: "200px", float: "right", marginTop: "-110px" }}
                                    src={producto.imagenProducto} alt="Producto" />
                            </div>
                        </div>
                        <div>
                            {producto.imagenComprobante ?
                                <div style={{ marginLeft: "30px" }}>
                                    <h6>Comprobante de pago</h6>
                                    <img style={{ height: "290px", width: "250px" }} src={producto.imagenComprobante} alt="" />
                                </div> : <>No tienes comprobante de pago</>}
                            <Button className="btn btn-outline-success" onClick={() => setModel(true)} >Agregar comprobante</Button>

                        </div>
                        <div>
                            {model ? <Model title="Comprobante de pago">
                                <Formik initialValues={{
                                    id: '',
                                    imagenComprobante: ''
                                }}

                                    onSubmit={async valores => {
                                        console.log(valores)
                                        valores.id = producto.id
                                        crearComprobantePago(valores)
                                    }}

                                >

                                    {(formikProps) => (
                                        <Form>
                                            <FormGroupImagen campo='imagenComprobante'
                                                tamaño="240px"
                                                label="Imagen Medio de pago"
                                                imagenURL={producto.imagenComprobante}
                                            />
                                            <br />

                                            <div style={{ paddingLeft: "130px" }}>
                                                <Button disabled={formikProps.isSubmitting} type="submit"
                                                    className="btn btn-primary"
                                                >Agregar</Button>
                                            </div>
                                        </Form>
                                    )}

                                </Formik>

                                <div style={{ marginTop: "-38px", marginLeft: "240px" }}>
                                    <Button type="submit"
                                        className="btn btn-danger"
                                        onClick={() => setModel(false)}
                                    >Cancelar</Button>
                                </div>
                            </Model> : null}
                        </div>
                    </div>
                )
                : <>No tienes ventas en "Proceso" para mostrar</>}

            <div>

            </div>

            <br /><br />

        </>
    )
}