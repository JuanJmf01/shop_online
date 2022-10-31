import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './css/rating.css'
import Swal from "sweetalert2";
import { AutenticationContextt } from "../App";
export default function Rating(props) {

    const { claims } = useContext(AutenticationContextt);
    const [maximoValorArr, setMaximoValorArr] = useState([]);
    const [valorSeleccionado, setValorSeleccionado] = useState(props.valorSeleccionado);

    useEffect(() => {
        setMaximoValorArr(Array(props.maximoValor).fill(0));
    }, [props.maximoValor])

    function manejarMouseOver(voto) {
        setValorSeleccionado(voto);
    }

    function manejarClick(voto) {
        if (claims.length === 0) {
            Swal.fire({ title: "Error", text: 'Debes loguearte para votar', icon: 'error' });
            return;
        }

        setValorSeleccionado(voto);
        props.onChange(voto);
    }

    return (
        <>
            {maximoValorArr.map((valor, indice) =>
                <FontAwesomeIcon
                    icon="star" key={indice}
                    onMouseOver={() => manejarMouseOver(indice + 1)}
                    onClick={() => manejarClick(indice + 1)}
                    className={`fa-lg pointer ${valorSeleccionado >= indice + 1 ? 'checked' : null}`}
                />)}
        </>
    )
}