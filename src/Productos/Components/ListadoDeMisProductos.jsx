import ListadoGenerico from "../../Utils/ListadoGenerico";
import MiProductoIndividual from "./MiProductoIndividual";

export default function ListadoDeMisProductos(props) {
    return (
        <>
            <ListadoGenerico listado={props.productos}>
                <div className="rows">
                    {props.productos?.map(producto => <MiProductoIndividual producto={producto}
                        key={producto.id}></MiProductoIndividual>)}
                </div>

            </ListadoGenerico>
        </>
    )
}