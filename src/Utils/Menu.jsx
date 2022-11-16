import { useContext } from "react";
import { Link } from "react-router-dom";
import { AutenticationContextt } from "../App";
import Autorizado from "../Auth/Autorizado";
import { logout } from "../Auth/manejadorJWT";
import Button from "./Button";
import './css/menu.css'

export default function Menu() {
    const { actualizar, claims } = useContext(AutenticationContextt)

    function obtenerNombreUsuario() {
        return claims.filter(x => x.nombre === 'email')[0]?.valor
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <Link className="navbar-brand" to="/productos">Marketplace</Link>
                    <div className="collapse navbar-collapse" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'smaller' }}>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/ofertas">Ofertas</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Buscar
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to='/filtro/productos'>Productos</Link>
                                    <Link className="dropdown-item" to='/filtro/vendedores'>Vendedores</Link>
                                    <Link className="dropdown-item" to='/filtro/domiciliarios'>Domiciliarios</Link>
                                </div>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/misCompras">Mis compras</Link>
                            </li>
                            <Autorizado role="vendedor" autorizado={<>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/misVentas">Mis ventas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/misProductos">Mis productos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/productos/crear">Crear producto</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/usuarios">Usuarios</Link>
                                </li>
                            </>
                            }
                            />

                            <li className="nav-item dropdown d-flex float-left">
                                <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Perfil
                                </Link>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/personalInformacion">Informacion personal</Link>
                                    <Autorizado role="vendedor" autorizado={<><Link className="dropdown-item" to="/informacionNegocio">Informacion de negocio</Link></>} />
                                </div>
                            </li>
                        </ul>

                        <div className="d-flex ">
                            <Autorizado autorizado={<>
                                <span className="nav-link" style={{ color: "gray", paddingRight: "25px" }}>Bienvenido {obtenerNombreUsuario()}</span>
                                <Button onClick={() => {
                                    logout()
                                    actualizar([])
                                }}
                                    className="nav-link btn text-secondary"
                                >Log Out</Button>
                            </>}
                                noAutorizado={<>
                                    <Link style={{ color: "white" }} className="nav-link btn btn-link" to="/login">Login</Link>
                                    <Link style={{ color: "white" }} className="nav-link btn btn-link" to="/clienteO_vendedor">Registrarse</Link>
                                </>}
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
