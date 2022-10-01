import { Link } from "react-router-dom";

export default function ClienteOVendedor() {
    return (
        <>
            <h4>Crea una cuenta</h4>
            <div>
                <Link to='/registroCliente'>Registrarse como cliente?</Link>
            </div>
            <div>
                <Link to='/registroVendedor'>Registrarse como vendedor?</Link>
            </div>
        </>
    )
}