import { Link } from "react-router-dom";
import './css/productoIndividual.css'
export default function ProductoIndividual(props) {

    const construirLink = () => `/producto/${props.producto.id}`
    return (
        <>
            <div className='component'>
                <Link href={construirLink()}>
                    <img src={props.producto.imagen} alt="Poster" />
                </Link>
                <p>
                    <Link href={construirLink()}>{props.producto.titulo}</Link>
                    <div>
                        <label>{props.producto.precio}</label>
                    </div>
                </p>
            </div>
        </>
    )
}