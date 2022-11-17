import ListadoGenerico from "../../Utils/ListadoGenerico";
import MiProductoIndividual from "./MiProductoIndividual";

export default function ListadoDeMisProductos(props) {
    const producto = [{
        id:1,
        nombre:"choclitos",
        precio:1200,
        categorias:"mekato",
        votoUsuario:5,
        promedioVoto:4,
        numeroCelular:"32254678",
        imagenProducto:"lanzamiento.png"

    },
    {
        id:2,
        nombre:"torta la abuela",
        precio:1200,
        categorias:"mekato",
        votoUsuario:5,
        promedioVoto:4,
        numeroCelular:"32254678",
        imagenProducto:"lanzamiento.png"

    }]
    return (
        <>
            <ListadoGenerico listado={producto}>
                <div className="rows">
                    {producto?.map(producto => <MiProductoIndividual producto={producto}
                        key={producto.id}></MiProductoIndividual>)}
                </div>

            </ListadoGenerico>
        </>
    )
}