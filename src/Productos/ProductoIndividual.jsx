import { Link } from "react-router-dom";
import './css/productoIndividual.css'
export default function ProductoIndividual(props) {
    const id = 1
    const precio = 500
    const nombre = 'julito'
    const construirLink = () => `/productos/${id}`
    return (
        <>
            <div className='card col-3 shadow p-3 mb-5 bg-body rounded'>
                <Link to={construirLink()}>
                    <img src={props.producto.imagenProducto} class="card-img-top" alt="Poster" />
                </Link>  
                <div className="car-body p-2" >
                    <h5 class="card-title"><span><Link style={{ textDecoration: 'none' }}>{precio}</Link></span></h5>
                    <p class="card-text"><Link href={construirLink()} style={{ textDecoration: 'none' }}>{nombre}</Link></p>
                    <Link className='btn btn-outline-secondary '
                        to={`/productos/${id}`}>
                        Ver
                    </Link>
                </div>
            </div>
        </>
    )
}