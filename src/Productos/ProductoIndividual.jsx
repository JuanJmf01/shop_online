import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../Utils/Button";
import { urlVentas } from "../Utils/endpoinds";
import './css/productoIndividual.css'
export default function ProductoIndividual(props) {

    const construirLink = () => `/productos/${props.producto.id}`
    const { producto } = props

    function productoIndividual(id) {
        axios.get(`${urlVentas}/productoIndividual/${id}`)
            .then((respuesta) => {
                //setProducto(respuesta.data)
                //setVendedor(respuesta.data.vendedores[0])
                console.log("RESPUESTA", respuesta.data)
            })
    }

    return (
        <>
            <div className='card col-3 shadow p-4 mb-52 bg-body rounded component'>

                <div>
                    <Link to={construirLink()}>
                        <img src={props.producto.imagenProducto} alt="Poster" />
                    </Link>
                    <p>
                        <Link href={construirLink()}>{props.producto.nombre}</Link>
                    </p>
                    <span><Link>{props.producto.precio}</Link></span>
                </div>
                <div className="buttons">
                    <Link className='btn btn-outline-secondary'
                        to={construirLink()}>
                        Vista Previa
                    </Link>
                    <Button className="btn btn-danger" onClick={() => { productoIndividual(props.producto.id) }}>
                        Prueba
                    </Button>
                </div>
            </div>
        </>
    )
}