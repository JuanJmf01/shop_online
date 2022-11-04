import { useContext } from "react";
import { Link } from "react-router-dom";
import { AutenticationContextt } from "../App";
import Autorizado from "../Auth/Autorizado";
import { logout } from "../Auth/manejadorJWT";
import Button from "./Button";

export default function Menu() {

        const { actualizar, claims } = useContext(AutenticationContextt)

        function obtenerNombreUsuario() {
            return claims.filter(x => x.nombre === 'email')[0]?.valor
        }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/productos">PRODUCTS</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/productos">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ofertas">Ofertas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/filtro">Filtrar</Link>
                        </li>
                        <Autorizado role="vendedor"
                            autorizado={
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/misProductos">Mis productos</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/misVentas">Mis ventas</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/productos/crear">Crear producto</Link>
                                    </li>
                                </>
                            }
                        />
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Perfil
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link className="dropdown-item" to="/personalInformacion">Informacion personal</Link>
                                <Link className="dropdown-item" to="/informacionNegocio">Informacion de negocio</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" href="#">Something else here</Link>
                            </div>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <Autorizado
                            autorizado={<>
                                <span className="nav-link">Bienvenido {obtenerNombreUsuario()}</span>
                                <Button
                                    onClick={() => {
                                        logout()
                                        actualizar([])
                                    }}
                                    className="nav-link btn btn-link"
                                >Log Out</Button>
                            </>}
                            noAutorizado={<>
                                <Link className="nav-link btn btn-link" to="/login">Login</Link>
                                <Link className="nav-link btn btn-link" to="/clienteO_vendedor">Registrarse</Link>
                            </>}
                        />
                    </div>
                </div>
            </nav>
        </>
    )
}
