import './css/selectorMultiple.css'

export default function SelectorMultiple(props) {

    //Esta funcion se ejecuta multiple veces. Esta siendo llamada simultaneas veces por un .map
    function seleccionar(item){
        //Se crea un nuevo arreglo 'seleccionados' al cual le agrego los items ya que no podemos modificar los props
        const seleccionados = [...props.seleccionados, item];
        const noSeleccionados = props.noSeleccionados.filter(valor => valor !== item);
        props.onChange(seleccionados, noSeleccionados);
    }

    function deseleccionar(item){
        const seleccionados = props.seleccionados.filter(valor => valor !== item);
        const noSeleccionados = [...props.noSeleccionados, item];
        props.onChange(seleccionados, noSeleccionados);
    }

    function deseleccionarTodo(){
        const noSeleccionados = [...props.noSeleccionados, ...props.seleccionados];
        const seleccionados = [];
        props.onChange(seleccionados, noSeleccionados);
    }

    return (
        <div className="selector-multiple">
            <ul>
                {props.noSeleccionados.map(item => 
                    <li key={item.llave} onClick={() => seleccionar(item)}>{item.valor}</li>)}                    
            </ul>
            <div className="selector-multiple-botones">
                    <button type="button" onClick={deseleccionarTodo}>{'<<'}</button>
            </div>
            <ul>
                {props.seleccionados.map(item => 
                    <li key={item.llave} onClick={() => deseleccionar(item)}>{item.valor}</li>)}
            </ul>
        </div>
    )
}

