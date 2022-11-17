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
    /*const bd = [
        {
            id:1,
            nombre:"choclitos",
            precio:1200,
            categorias:"mekato",
            votoUsuario:5,
            promedioVoto:4,
            descripcion:"torta muy rica fsdkjfnjkdsnkdsncjkdsncjkdsnckdsncjkndscnkjsdn dckjdncds kdcksdcdksjn klmlmpklñ,-dsc ",
            numeroCelular:"32254678",
            imagenProducto:"lanzamiento.png"

        },
        {
            id:2,
            nombre:"torta la abuela",
            precio:1200,
            categorias:{
                id:1,
                nombre:"juguitos"
            },
            votoUsuario:5,
            descripcion:"torta muy rica fsdkjfnjkdsnkdsncjkdsncjkdsnckdsncjkndscnkjsdn dckjdncds kdcksdcdksjn klmlmpklñ,-dsc ",
            promedioVoto:4,
            numeroCelular:"32254678",
            imagenProducto:"lanzamiento.png"

        },
        
    ]

    const bd2 = [
        {
            id:1,
            nombre:"julito",
            numeroCelular:"32254678",

        },
        {
            id:2,
            nombre:"julito",
            numeroCelular:"32254678",
        },
        
    ]*/
    const [añadirVenta, setAñadirVenta] = useState(false)
    const [comprar, setComprar] = useState(false)
    const [cantidad, setCantidad] = useState(1)
    const [producto , setProducto] = useState()
    const [vendedor, setVendedor] = useState()
    console.log('producto desde detalle21', producto.categorias)
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
            { producto ? 
            <div class="container">

                {producto ? 
                <div>
                    <div class="card mt-3 col-10 ">
                        <h2 class="card-header">{producto.nombre}</h2>
                        {/*producto.categorias?.map(categoria =>*/
                            <Link key="" style={{ marginRight: '5px' }}
                                className="btn btn-primary btn-sm rounded-pill"
                                to="{/*`/productos/filtrar?generoId=`*/}"
                            >{/*categoria.nombre*/}
                            </Link>/*)*/
                        }
                       
                        <div class="card-body p-2" style={{ display: 'flex', marginTop: '1rem' }}>

                            <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                                <img src={producto.imagenProducto}
                                    style={{ width: '235px', height: '235px' }}
                                    alt="poster"
                                />
                            </span>
                            <div class="col-6">
                                {console.log(producto.votoUsuario)}
                                | Voto Promedio : {producto.promedioVoto}
                                | Tu voto :  <Rating maximoValor={5}
                                    valorSeleccionado={producto.votoUsuario}
                                    onChange={onVote} />
                                {producto.descripcion ? <div style={{ marginTop: '1rem' }}>
                                    <h3>Descripcion</h3>
                                    <div>
                                        <p>{producto.descripcion}</p>
                                    </div>
                                </div> : null}
                            </div>
                            <div class="mx-2">
                                <h4>Precio</h4>
                                <div><h5>$ {producto.precio}</h5></div>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="btn btn-success"
                                    onClick={() => setAñadirVenta(true)}
                                >Añadir venta</Button>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="btn btn-primary"
                                    onClick={() => setComprar(true)}
                                >Comprar</Button>
                            </div>
                        </div>
                        <div class="mx-3 mb-3">
                           <Link
                                onClick={() => confirmar(() => borrarProducto())}
                                className="btn btn-danger btn-sm rounded-pill ">Borrar</Link>
                            <Link
                                className="btn btn-primary btn-sm rounded-pill"
                                to={`/productos/editar/${id}`}>Modificar</Link>
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
                        <div class="form-row">
                            <h5 class="col-md-6" >Cantidad vendida:</h5>
                            <input className="form-control col-md-6" type="number" onKeyUp={(e) => setCantidad(e.currentTarget.value)} />
                        </div>
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

                        <div class="row">
                            <h5 class="col-7">Cantidad a comprar: </h5>
                            <input className="form-control col-5" type="number" onKeyUp={(e) => setCantidad(e.currentTarget.value)} />
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
                            <div class="d-flex flex-row">
                                    <div class="ml-5 col-3">
                                        <Button className='btn btn-primary px-4' onClick={console.log()}>Nequi</Button>
                                    </div>
                                    <div class="col-4">
                                        <Button className='btn btn-warning px-4' onClick={console.log()}>Bancolombia</Button>
                                    </div>
                                    <div class="col-4">
                                        <Button className='btn btn-danger px-4' onClick={console.log()}>Daviplata</Button>
                                    </div>
                            </div>
                        </div>

                        <div className="btns">
                            <Button className='btn btn-danger' onClick={() => !setComprar()}>Cancelar</Button>
                        </div>
                    </div>
                </Model> : null
                }
            </div> : <Cargando />}
        </>
    )
}