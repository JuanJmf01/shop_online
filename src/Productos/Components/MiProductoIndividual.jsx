import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../Utils/AlertaContext";
import Button from "../../Utils/Button";
import confirmar from "../../Utils/ConfirmarDelete";
import { urlProductos } from "../../Utils/endpoinds";
import './css/miProductoIndividual.css'

export default function MiProductoIndividual(props) {

    const construirLink = () => `/productos/${props.producto.id}`
    const alerta = useContext(AlertaContext)

    function borrarProducto() {
        axios.delete(`${urlProductos}/${props.producto.id}`)
            .then(() => {
                alerta()
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
                    <Link style={{ marginRight: '0.7rem', }} className='btn btn-outline-secondary'
                        to={`/productos/editar/${props.producto.id}`}>
                        Editar
                    </Link>
                    <Button
                        onClick={() => confirmar(() => borrarProducto())}
                        className="btn btn-outline-danger">Borrar</Button>
                </div>
            </div>
        </>
    )
}