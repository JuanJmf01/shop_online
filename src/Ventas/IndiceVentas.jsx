import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AutenticationContextt } from "../App"
import { urlCompras, urlUsuarios, urlVendedores, urlVentas } from "../Utils/endpoinds"

export default function IndiceVentas() {

    const { claims } = useContext(AutenticationContextt)

    const [ventas, setVentas] = useState([])
    const [enProceso, setEnProceso] = useState([])

    const nombreUsuario = claims.filter(x => x.nombre === 'email')[0]?.valor

    var idPro = []

    async function obtenerUsuario(email) {
        try {
            await axios.get(`${urlVendedores}/${email}`)
                .then((respuesta) => {
                    console.log(respuesta.data.id)
                    allVendedores(respuesta.data.id)
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
                    setVentas(respuesta.data.compras)
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
            <br /><br />
            <h3>Tus ventas en proceso</h3>
            {enProceso.length !== 0 ?
                enProceso.map(producto =>
                    <div className="card" style={{ top: "200", justifyContent: "flex-end", marginBottom: "30px" }}>
                        <div className="card-header" style={{ display: "flex" }}>
                            <h4>Cliente:</h4>
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
                : <>No tienes ventas en "Proceso" para mostrar</>}


            <h3>Tus ventas</h3>
            {ventas.length !== 0 ?
                ventas.map(producto =>
                    <div className="card" style={{ top: "200", justifyContent: "flex-end", marginBottom: "30px" }}>
                        <div className="card-header" style={{ display: "flex" }}>
                            <h4>Cliente: </h4>
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
                : <>No hay ventas para mostrar</>}
        </>
    )
}