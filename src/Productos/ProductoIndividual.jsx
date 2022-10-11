import { Link } from "react-router-dom";
import './css/productoIndividual.css'
export default function ProductoIndividual(props) {

    const construirLink = () => `/productos/${props.producto.id}`
    return (
        <>
            <div className='component'>
                <div className="subComponent">
                    <Link to={construirLink()}>
                        <img src={props.producto.imagenProducto} alt="Poster" />
                    </Link>
                    <p>
                        <Link href={construirLink()}>{props.producto.nombre}</Link>
                    </p>
                    <span><Link>{props.producto.precio}</Link></span>
                </div>

                <div>
                    <Link style={{ width: '90px', margin: '10px', color: '#fff' }} className='btn btn-primary'
                        to={`/productos/${props.producto.id}`}>
                        Ver
                    </Link>
                </div>
            </div>
        </>
    )
}