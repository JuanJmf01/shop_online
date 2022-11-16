import axios from "axios"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import { AutenticationContextt } from "../App"
import Button from "../Utils/Button"
import Cargando from "../Utils/Cargando"
import { urlCompras, urlProductos, urlUsuarios, urlVendedores, urlVentas } from "../Utils/endpoinds"
import { FormDataVentas } from "../Utils/FormDataVentas"
import Input from "../Utils/Input"
import Model from "../Utils/Models/Model"

export default function IndiceVentas() {

    const { claims } = useContext(AutenticationContextt)

    const [stateModel, setStateModel] = useState(false)
    const [productoInd, setProductoInd] = useState()
    const [esCliente, setEsCliente] = useState()
    const [vendedorId, setVendedorId] = useState()
    const [clienteId, setClienteId] = useState()
    const [idCompra, setIdCompra] = useState()

    const [ventas, setVentas] = useState([])
    const [enProceso, setEnProceso] = useState([])


    const nombreUsuario = claims.filter(x => x.nombre === 'email')[0]?.valor

    var idPro = []
    var idProVentas = []
    var longitud

    async function obtenerUsuario(email) {
        try {
            await axios.get(`${urlVendedores}/${email}`)
                .then((respuesta) => {
                    console.log(respuesta.data.id)
                    setVendedorId(respuesta.data.id)
                    allVendedores(respuesta.data.id)
                    allVendedoresVentas(respuesta.data.id)
                })
        } catch (error) {
            console.log(error)
        }
    }

    async function allVendedores(id) {
        await axios.get(`${urlVentas}/ventas/${id}`)
            .then((respuesta) => {
                returnProducto(respuesta.data)
            })
    }

    async function allVendedoresVentas(id) {
        await axios.get(`${urlVentas}/ventasTwo/${id}`)
            .then((respuesta) => {
                returnProductoVenta(respuesta.data)
                longitud = respuesta.data.length
            })
    }

    async function returnProducto(users) {
        for (var i = 0; i < users.length; i++) {
            var idd = users[i].productoId
            idPro.push(idd)
        }

        productoEnproceso(idPro)
    }

    async function returnProductoVenta(users) {
        for (var i = 0; i < users.length; i++) {
            var idd = users[i].productoId
            idProVentas.push(idd)
        }

        productoVentas(idProVentas)
    }


    async function productoEnproceso(valores) {
        var newValores = valores.slice(0, 4)
        try {
            axios.post(`${urlCompras}/mostrarProductos`, JSON.stringify(valores),
                {
                    headers: { 'Content-Type': 'application/json' }
                }).then((respuesta) => {
                    console.log("ULTIMA ", respuesta.data)
                    setEnProceso(respuesta.data)
                })
        } catch (error) {
            console.log(error.response.data)
        }
    }

    async function productoVentas(valores) {
            try {
            axios.post(`${urlVentas}/mostrarVentas`, JSON.stringify(valores),
                {
                    headers: { 'Content-Type': 'application/json' }
                }).then((respuesta) => {
                    console.log("ULTIMA DESPUES ", respuesta.data)
                    setVentas(respuesta.data)
                })
        } catch (error) {
            console.log(error.response.data)
        }
    }


    function productoIndividual(id) {
        axios.get(`${urlProductos}/${id}`)
            .then((respuesta) => {
                setProductoInd(respuesta.data)
                //setVendedor(respuesta.data.vendedores[0])
                console.log(respuesta.data)
            })
    }


    async function añadirVenta2(valores) {
        try {
            const formData = FormDataVentas(valores)
            await axios({
                method: 'post',
                url: urlVentas,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            Swal.fire({ icon: 'success', title: 'Venta agregada' })
            borrarCompraEnProceso(idCompra)
            setStateModel(false)
        }
        catch (error) {
            console.log(error.response.data)
        }
    }


    function borrarCompraEnProceso(id) {
        axios.delete(`${urlVentas}/${id}`)
    }

    useEffect(() => {
        obtenerUsuario(nombreUsuario)
    }, [nombreUsuario])

    return (
        <>
            <br /><br />
            <h3>Tus ventas en proceso</h3>
            <br />
            {enProceso.length !== 0 ?
                enProceso.map(producto =>
                    <div className="card" style={{ top: "200", justifyContent: "flex-end", marginBottom: "30px" }}>
                        <div className="card-header" style={{ display: "flex" }}>
                            <h4>Cliente:</h4>
                            <div style={{ marginLeft: "auto" }}>

                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Producto: {producto.nombre}</h5>
                            <h6 className="card-title">Precio: {producto.precio}</h6>

                            <p className="card-text">{producto.descripcion}</p>
                            <img style={{ with: "200px", height: "200px", float: "right", marginTop: "-110px" }}
                                src={producto.imagenProducto} alt="Producto" />
                            <div style={{ paddingTop: "40px", paddingLeft: "30px" }}>
                                <Button
                                    type="submit"
                                    className="btn btn-success"
                                    onClick={() => {
                                        productoIndividual(producto.productoId)
                                        setStateModel(true)
                                        setClienteId(producto.clienteId)
                                        setEsCliente(producto.esCliente)
                                        setIdCompra(producto.id)
                                    }}
                                >Añadir venta</Button>
                            </div>
                        </div>
                    </div>
                )
                : <>No tienes ventas en "Proceso" para mostrar</>}

            <h3>Tus ventas</h3>
            <br />
            {ventas.length !== 0 ?
                ventas.map(producto =>
                    <div className="card" style={{ top: "200", justifyContent: "flex-end", marginBottom: "30px" }}>
                        <div className="card-header" style={{ display: "flex" }}>
                            <h4>Cliente:</h4>
                            <div style={{ marginLeft: "auto" }}>

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
                                <h6 className="card-title">Cantidad total vendida: </h6>
                                <p style={{ marginLeft: "15px" }}>{producto.cantidad}</p>
                            </div>
                            <div style={{ display: "flex", marginTop: "-10px" }}>
                                <h6 className="card-title">Total $: </h6>
                                <p style={{ marginLeft: "15px" }}>{producto.total}</p>
                            </div>

                            <img style={{ with: "200px", height: "200px", float: "right", marginTop: "-110px" }}
                                src={producto.imagenProducto} alt="Producto" />
                        </div>
                    </div>
                )
                : <>No hay ventas para mostrar</>}


            {productoInd ?
                <div>
                    {stateModel ? <Model title="Añadir una venta">
                        <div style={{ display: "flex" }}>
                            <h5 >Producto:</h5>
                            <label style={{ marginLeft: "auto" }} >{productoInd.nombre}</label>
                        </div>

                        <div style={{ display: "flex" }}>
                            <h5>Precio unidad:</h5>
                            <label style={{ marginLeft: "auto" }} >{productoInd.precio}</label>
                        </div>
                        <br />
                        <Formik initialValues={{
                            total: '',
                            cantidad: '',
                            fecha: '',
                            esCliente: '',
                            clienteId: '',
                            vendedorId: '',
                            productoId: ''
                        }}
                            onSubmit={async valores => {
                                valores.total = productoInd.precio * valores.cantidad
                                valores.productoId = productoInd.id
                                valores.vendedorId = vendedorId
                                valores.esCliente = esCliente
                                valores.clienteId = clienteId
                                console.log(valores)
                                añadirVenta2(valores)
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <h5>Cantidad a vender</h5>
                                    <div>
                                        <Input type="number" campo="cantidad" />
                                    </div>
                                    <br />
                                    <div>
                                        <span>Fecha de venta</span>
                                        <Input type='date' campo='fecha' />
                                    </div>
                                    <br />

                                    <div className="btns">
                                        <Button disabled={formikProps.isSubmitting} type="submit" className='btn btn btn-success'>Confirmar</Button>
                                        <Button className='btn btn-danger' onClick={() => !setStateModel()}>Cancelar</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </Model> : null}
                </div> : null
            }

        </>
    )
}