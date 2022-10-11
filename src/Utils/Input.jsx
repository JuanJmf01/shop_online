import { ErrorMessage, Field } from "formik";
import MostrarErrorInput from "./MostrarErrorInput";

export default function Input(props) {
    return (
        <>
            <div className='form-group'>
                {props.label ? <label htmlFor={props.campo}>{props.label}</label> : null}
                <Field className='form-control'
                    type={props.type}
                    name={props.campo}
                    placeholder={props.placeholder}
                    onKeyUp={props.onKeyUp}
                />
                <ErrorMessage name={props.campo}>
                    {mms =>
                        <div>
                            <MostrarErrorInput mensaje={mms} />
                        </div>}
                </ErrorMessage>
            </div>
        </>
    )
}