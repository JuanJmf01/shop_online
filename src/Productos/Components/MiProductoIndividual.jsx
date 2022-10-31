import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../Utils/AlertaContext";
import Button from "../../Utils/Button";
import confirmar from "../../Utils/ConfirmarDelete";
import { urlProductos } from "../../Utils/endpoinds";

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

                <div className="buttons">
                    <Link style={{ marginRight: '0.7rem', color: '#fff' }} className='btn btn-primary'
                        to={`/productos/editar/${props.producto.id}`}>
                        Editar
                    </Link>
                    <Button
                        onClick={() => confirmar(() => borrarProducto())}
                        className="btn btn-danger">Borrar</Button>
                </div>
            </div>
        </>
    )
}