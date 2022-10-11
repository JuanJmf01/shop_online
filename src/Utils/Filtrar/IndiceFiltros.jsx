import { Link } from "react-router-dom";

export default function IndiceFiltros() {
    return (
        <>
            <div>
                <Link to='/filtro/productos'>Filtrar productos</Link>
            </div>
            <div>
                <Link to='/filtro/vendedores'>Filtrar vendedores</Link>
            </div>
            <div>
                <Link to='/filtro/domiciliarios'>Filtrar domiciliarios</Link>
            </div>
        </>
    )
}