import { Field } from "formik";

export default function FormGroupCheckBox(props) {
    return (
        <div className="form-group form-check">
            <Field className="form-check-input" id={props.campo} name={props.campo}
                type="checkbox"
                onChange={props.onChange}
                checked={props.checked} />
            <label htmlFor={props.campo}>{props.label}</label>
        </div>
    )
}