import ProductoIndividual from "./ProductoIndividual";
import './css/listadoDeProductos.css'
import Cargando from "../Utils/Cargando";

export default function ListadoDeProductos(props) {
    if (!props.productos) {
        return <Cargando />
    } else if (props.productos.length === 0) {
        return <>No hay elementos</>
    } else {
        return (
            <div className="rows">
                {props.productos.map(producto => <ProductoIndividual producto={producto}
                    key={producto.id} />)}
            </div>
        )
    }


}
