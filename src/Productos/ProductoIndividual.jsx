import { Link } from "react-router-dom";
import './css/productoIndividual.css'
export default function ProductoIndividual(props) {
    
    const construirLink = () => `/productos/${props.producto.id}`
    return (
        <>
            <div id ="carProduct" className='card col-3 p-3 mb-5 rounded mx-1'>
                <Link to={construirLink()}>
                    <img src={props.producto.imagenProducto} class="card-img-top" alt="Poster" />
                </Link>  
                <div className="car-body p-2" >
                    <h5 class="card-title"><span><Link style={{ textDecoration: 'none' }}>{props.producto.precio}</Link></span></h5>
                    <p class="card-text"><Link href={construirLink()} style={{ textDecoration: 'none' }}>{props.producto.nombre}</Link></p>
                    <Link className='btn btn-outline-secondary '
                        to={`/productos/${props.producto.id}`}>
                        Ver
                    </Link>
                </div>
            </div>
        </>
    )
}