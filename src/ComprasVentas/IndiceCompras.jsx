import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AutenticationContextt } from "../App"
import Button from "../Utils/Button"
import Cargando from "../Utils/Cargando"
import { urlCompras, urlProductos, urlUsuarios, urlVendedores, urlVentas } from "../Utils/endpoinds"

export default function IndiceCompras() {

    const [enProceso, setEnProceso] = useState([])


    const [compras, setCompras] = useState([])
    const [esCliente, setEsCliente] = useState(true)

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
                    console.log("PRINCIPAL", respuesta.data)
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
                    console.log("ULTIMA DESPUES ", respuesta.data)
                    setCompras(respuesta.data)
                })
        } catch (error) {
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
                compras.map(producto => <>
                    <div className="card" style={{ top: "200", justifyContent: "flex-end", marginBottom: "30px" }}>
                        <div className="card-header" style={{ display: "flex" }}>
                            <div style={{ marginLeft: "auto" }}>

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
                </>)
                : <>No hay productos en "Proceso" para mostrar</>
            }


            <br />
            <br />
            <h2>Mis pendientes</h2>
            <br />
            {
                enProceso.length !== 0 ?
                    enProceso.map((producto) => <>
                        <div className="card" style={{ top: "200", justifyContent: "flex-end", marginBottom: "30px" }}>
                            <div className="card-header" style={{ display: "flex" }}>
                                <h5>Producto: </h5>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Producto:</h5>
                                <h6 className="card-title">Precio: {producto.precio}</h6>
                                <p className="card-text">{producto.descripcion}</p>
                                <img style={{ with: "200px", height: "200px", float: "right", marginTop: "-110px" }}
                                    src={producto.imagenProducto} alt="Producto" />
                            </div>
                            <Button className="btn btn-danger">Ver</Button>
                        </div>
                    </>) : <>No hay compras para mostrar</>
            }

            <br /><br />

        </>
    )
}