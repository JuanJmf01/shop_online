import './css/models.css'

export default function Model(props) {
    return (
        <>
            <div className="overlay">
                <div className="ContenedorModal">
                    <div className='encabezadoModal'>
                        <h3>{props.title}</h3>
                    </div>
                    <div className="btnCerrar">
                        <i className="bi bi-x"></i>
                    </div>
                    <div className="contenido">
                        <h3>{props.subtitle}</h3>

                        {props.children}

                    </div>

                </div>
            </div>
        </>
    );
}
