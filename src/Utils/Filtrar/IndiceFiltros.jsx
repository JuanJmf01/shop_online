import { Link } from "react-router-dom";

export default function IndiceFiltros() {
    return (
        <>
            <div  class="d-grid gap-2 col-6 mx-auto mb-5 mt-5">
                <Link class="btn btn-outline-secondary" to='/filtro/productos'>Filtrar productos</Link>
            </div>
            <div  class="d-grid gap-2 col-6 mx-auto mb-5">
                <Link class="btn btn-outline-secondary" to='/filtro/vendedores'>Filtrar vendedores</Link>
            </div>
            <div  class="d-grid gap-2 col-6 mx-auto mb-5">
                <Link class="btn btn-outline-secondary" to='/filtro/domiciliarios'>Filtrar domiciliarios</Link>
            </div>
        </>
    )
}