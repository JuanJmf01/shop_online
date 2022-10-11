import ProductoIndividual from "./ProductoIndividual";
import './css/listadoDeProductos.css'
import Cargando from "../Utils/Cargando";
import ListadoGenerico from "../Utils/ListadoGenerico";

export default function ListadoDeProductos(props) {
    if(props.role === 'vendedor'){
        
    }
    return (
        <ListadoGenerico listado={props.productos}>
            <div className="rows">
                {props.productos?.map(producto => <ProductoIndividual producto={producto}
                    key={producto.id}></ProductoIndividual>)}
            </div>
            
        </ListadoGenerico>
    )
}

