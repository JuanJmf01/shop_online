import { Field } from "formik";

export default function FormGroupCheckBox(props) {
    return (
         <div className="mt-0">
            <Field className="btn-check" id={props.campo} name={props.campo}
                type="checkbox"
                onChange={props.onChange}
                checked={props.checked} 
                autocomplete="off"/>
            <label class="btn btn-outline-success"  htmlFor={props.campo}>{props.label}</label>
        </div>
    )
}