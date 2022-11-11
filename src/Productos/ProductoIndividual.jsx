import { Link } from "react-router-dom";
import './css/productoIndividual.css'
export default function ProductoIndividual(props) {

    const construirLink = () => `/productos/${props.producto.id}`
    const { producto } = props
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
                </div>
            </div>
        </>
    )
}