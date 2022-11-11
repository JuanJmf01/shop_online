import { Link } from "react-router-dom";
import './css/productoIndividual.css'
export default function ProductoIndividual(props) {

    const construirLink = () => `/productos/${props.producto.id}`
    const { producto } = props
    return (
        <>
            <div className='card col-3 shadow p-3 mb-5 bg-body rounded'>
                <Link to={construirLink()}>
                    <img src={producto.imagenProducto} class="card-img-top" alt="Poster" />
                </Link>
                <div className="car-body p-2" >
                    <h5 class="card-title"><span><Link style={{ textDecoration: 'none' }}>{producto.precio}</Link></span></h5>
                    <p class="card-text"><Link href={construirLink()} style={{ textDecoration: 'none' }}>{producto.nombre}</Link></p>
                    <Link className='btn btn-outline-secondary '
                        to={construirLink()}>
                        Ver
                    </Link>
                </div>
            </div>
        </>
    )
}