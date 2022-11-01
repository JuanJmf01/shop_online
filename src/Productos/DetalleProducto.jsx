import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import Button from "../Utils/Button"
import Cargando from "../Utils/Cargando"
import { urlProductos, urlRatings } from "../Utils/endpoinds"
import Model from "../Utils/Models/Model"
import AlertaContext from "../Utils/AlertaContext"
import './css/detalleProducto.css'
import confirmar from "../Utils/ConfirmarDelete"
import Rating from "../Utils/Rating"
import Swal from "sweetalert2"

export default function DetalleProducto() {

    const [añadirVenta, setAñadirVenta] = useState(false)
    const [comprar, setComprar] = useState(false)
    const [cantidad, setCantidad] = useState(1)
    const [producto, setProducto] = useState()
    const [vendedor, setVendedor] = useState({})

    const alerta = useContext(AlertaContext)

    const { id } = useParams()
    //const navigate = useNavigate()


    //Podemos traer por 'producto' por 'vendedores' y 'categorias'
    useEffect(() => {
        axios.get(`${urlProductos}/${id}`)
            .then((respuesta) => {
                setProducto(respuesta.data)
                setVendedor(respuesta.data.vendedores[0])
                console.log(respuesta.data)
            })
    }, [id])

    function calcularTotal(cantidad, precio) {
        var total = cantidad * precio

        return total
    }

    function borrarProducto() {
        try {
            axios.delete(`${urlProductos}/${id}`)
                .then(() => {
                    alerta()
                })
        } catch (error) {
            console.log(error.respuesta.data)
        }
    }

    async function onVote(voto) {
        await axios.post(urlRatings, { puntuacion: voto, productoId: id })
        Swal.fire({ icon: 'success', title: 'Voto recibido' });
    }

    return (
        <>
            {producto ? <div>

                {producto ? <div>
                    <div>
                        <h2>{producto.nombre}</h2>
                        {producto.categorias?.map(categoria =>
                            <Link key={categoria.id} style={{ marginRight: '5px' }}
                                className="btn btn-primary btn-sm rounded-pill"
                                to={`/productos/filtrar?generoId=${categoria.id}`}
                            >{categoria.nombre}
                            </Link>)
                        }
                        {console.log(producto.votoUsuario)}
                        | Voto Promedio : {producto.promedioVoto}
                        | Tu voto :  <Rating maximoValor={5}
                            valorSeleccionado={producto.votoUsuario}
                            onChange={onVote} />
                        <div style={{ display: 'flex', marginTop: '1rem' }}>

                            <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                                <img src={producto.imagenProducto}
                                    style={{ width: '235px', height: '235px' }}
                                    alt="poster"
                                />
                            </span>
                            {producto.descripcion ? <div style={{ marginTop: '1rem' }}>
                                <h3>Descripcion</h3>
                                <div>
                                    <p>{producto.descripcion}</p>
                                    <div>

                                    </div>
                                </div>
                            </div> : null}


                        </div>

                        <div>
                            <h4>Precio</h4>
                            <div><h5>$ {producto.precio}</h5></div>
                        </div>
                    </div>
                </div> : <Cargando />}
                {añadirVenta ? <Model title="Añadir venta">
                    <div className="model">
                        <div>
                            <h5 >Producto:</h5>
                            <label >{producto.nombre}</label>
                        </div>

                        <div>
                            <h5 >Precio unidad:</h5>
                            <label >{producto.precio}</label>
                        </div>

                        <h5>Cantidad vendida</h5>
                        <div>
                            <input className="form-control" type="number" onKeyUp={(e) => setCantidad(e.currentTarget.value)} />
                        </div>
                        <br />
                        <div>
                            <span>Fecha de venta</span>
                            <input className="form-control" type='date' campo='fechaVenta' />
                        </div>
                        <hr />

                        <div>
                            <span>Total vendido</span>
                            <input className="form-control" type="number" value={calcularTotal(cantidad, producto.precio)} />
                        </div>
                        <br />
                        <div className="btns">
                            <Button className='btn btn btn-success'>Añadir</Button>
                            <Button className='btn btn-danger' onClick={() => !setAñadirVenta()}>Cancelar</Button>
                        </div>
                    </div>

                </Model> : null}
                {comprar ? <Model title="Confirmar compra">
                    <div className="model">
                        <div>
                            <h5 >Producto:</h5>
                            <label >{producto.nombre}</label>
                        </div>
                        <div>
                            <h5>Precio Unidad:</h5>
                            <label>{producto.precio}</label>
                        </div>

                        <div>
                            <h5>Cantidad a comprar: </h5>
                            <input className="form-control" type="number" onKeyUp={(e) => setCantidad(e.currentTarget.value)} />
                        </div>

                        <hr />
                        <div>
                            <h5>Total a pagar</h5>
                            <input className="form-control" type="number" value={calcularTotal(cantidad, producto.precio)} disabled='disabled' />
                        </div>
                        <hr />
                        <h4>Contacto de vendedor</h4>
                        <div>
                            <h5>Nombre</h5>
                            <label>{vendedor.nombres}</label>
                        </div>
                        <div>
                            <h5>WhatsApp:</h5>
                            <a href={`https://wa.me/${vendedor.numeroCelular}`} target="_blank" rel="noreferrer">
                                <img src="https://cdn-icons-png.flaticon.com/512/2504/2504957.png" alt="WhatsApp"
                                    className="logo" />
                            </a>

                        </div>
                        <div>
                            <h5>Redes sociales:</h5>
                            <a href={vendedor.instagram} target="_blank" rel="noreferrer">
                                <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram"
                                    className="logo" />
                            </a>
                            <a href={vendedor.facebook} target="_blank" rel="noreferrer">
                                <img src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" alt="Facebook"
                                    className="logo" />
                            </a>
                            <hr />
                            <h4>Medios de pago</h4>
                        </div>

                        <div className="btns">
                            <Button className='btn btn-danger' onClick={() => !setComprar()}>Cancelar</Button>
                        </div>
                    </div>
                </Model> : null
                }

                <div>
                    <Button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => setAñadirVenta(true)}
                    >Añadir venta</Button>
                </div>
                <br />
                <div>
                    <Button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => setComprar(true)}
                    >Comprar</Button>
                </div>

                <br />
                <div>
                    <Link
                        onClick={() => confirmar(() => borrarProducto())}
                        className="btn btn-danger btn-sm rounded-pill">Borrar</Link>
                    <Link
                        className="btn btn-primary btn-sm rounded-pill"
                        to={`/productos/editar/${id}`}
                    >Modificar</Link>
                </div>
            </div> : <Cargando />}
        </>
    )
}