import { useFormikContext } from "formik";
import { useState } from "react"

export default function FormGroupImagen(props) {

    const divStyle = { marginTop: '10px' }
    const imgStyle = { width: '310px' }

    const [imagenBase64, setImagenBase64] = useState('');
    const [imagenURL, setImagenURL] = useState(props.imagenURL)
    const { values } = useFormikContext()

    const ManejarOnChange = (e) => {
        if (e.currentTarget.files) {
            const archivo = e.currentTarget.files[0];
            aBase64(archivo)
                .then((representacionBase64) => setImagenBase64(representacionBase64))
                .catch(error => console.error(error))

            values[props.campo] = archivo;
            setImagenURL('');
        }
    }

    const aBase64 = (file) => {
        return new Promise ((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        })
    }

    return (
        <div className="form-group">
            <label>{props.label}</label>
            <div>
                <input class="form-control" type="file" accept=".jpg,.jpeg,.png" onChange={ManejarOnChange} />
            </div>
            {imagenBase64 ?
                <div>
                    <div style={divStyle}>
                        <img style={imgStyle} src={imagenBase64} alt="imagen seleccionada" />
                    </div>
                </div> : null
            }
            {imagenURL ?
                <div>
                    <div style={divStyle}>
                        <img style={imgStyle} src={imagenURL} alt="imagen seleccionada" />
                    </div>
                </div> : null
            }
        </div>
    )
}
