import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AutenticationContextt } from "../App"
import Button from "../Utils/Button"
import Cargando from "../Utils/Cargando"
import { urlCompras, urlUsuarios, urlVendedores } from "../Utils/endpoinds"

export default function IndiceCompras() {

    const [enProceso, setEnProceso] = useState([])
    const [compras, setCompras] = useState([])
    const [esCliente, setEsCliente] = useState(true)

    const { claims } = useContext(AutenticationContextt)

    const nombreUsuario = claims.filter(x => x.nombre === 'email')[0]?.valor

    var idPro = []

    async function obtenerUsuario(email) {
        try {
            await axios.get(`${urlUsuarios}/${email}`)
                .then((respuesta) => {
                    allClientes(respuesta.data.id)
                })
        } catch {
            await axios.get(`${urlVendedores}/${email}`)
                .then((respuesta) => {
                    setEsCliente(false)
                    allVendedores(respuesta.data.id)
                })
        }
    }

    async function allClientes(id) {
        await axios.get(`${urlCompras}/compradoresCliente/${id}`)
            .then((respuesta) => {
                returnProducto(respuesta.data)
            })
    }

    async function allVendedores(id) {
        await axios.get(`${urlCompras}/compradoresVendedor/${id}`)
            .then((respuesta) => {
                returnProducto(respuesta.data)
            })
    }

    async function returnProducto(users) {
        for (var i = 0; i < users.length; i++) {
            var idd = users[i].productoId
            idPro.push(idd)
        }

        producto(idPro)
    }


    async function producto(valores) {
        try {
            axios.post(`${urlCompras}/traerProductos`, JSON.stringify(valores),
                {
                    headers: { 'Content-Type': 'application/json' }
                }).then((respuesta) => {
                    console.log(respuesta.data)
                    setCompras(respuesta.data.compras)
                    setEnProceso(respuesta.data.enProceso)
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
                compras.map(producto =>
                    <div className="card" style={{ top: "200", justifyContent: "flex-end", marginBottom: "30px" }}>
                        <div className="card-header" style={{ display: "flex" }}>
                            <h4>Vendedor: {producto.vendedores[0].nombres}</h4>
                            <div style={{ marginLeft: "auto" }}>
                                {producto.categorias?.map(categoria =>
                                    <Link key={categoria.id} style={{ marginRight: '5px' }}
                                        className="btn btn-primary btn-sm rounded-pill"
                                        to={`/productos/filtrar?generoId=${categoria.id}`}
                                    >{categoria.nombre}
                                    </Link>)
                                }
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
                )
                : <>No hay productos en "Proceso" para mostrar</>}


            <br />
            <br />
            <h2>Mis pendientes</h2>
            <br />
            {enProceso.length !== 0 ?
                enProceso.map(producto =>
                    <div className="card" style={{ top: "200", justifyContent: "flex-end", marginBottom: "30px" }}>
                        <div className="card-header" style={{ display: "flex" }}>
                            <h4>Vendedor: {producto.vendedores[0].nombres}</h4>
                            <div style={{ marginLeft: "auto" }}>
                                {producto.categorias?.map(categoria =>
                                    <Link key={categoria.id} style={{ marginRight: '5px' }}
                                        className="btn btn-primary btn-sm rounded-pill"
                                        to={`/productos/filtrar?generoId=${categoria.id}`}
                                    >{categoria.nombre}
                                    </Link>)
                                }
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
                ) : <>No hay compras para mostrar</>}

            <br /><br />

        </>
    )
}