import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Button from "../Button";
import FormGroupCheckBox from "../FormGroupCheckBox";
import Input from "../Input";
import Model from "../Models/Model";

export default function FiltroDomiciliarios() {

    const [domiciliarios, setDomiciliarios] = useState([])
    const [stateDomiciliario, setStateDomiciliario] = useState(false)


    const valorInicial = {
        nombres: '',
        apellidos: '',
        stateVendedor: false
    }

    return (
        <>
            <h3>Filtro domiciliarios</h3>
            <Formik initialValues={{
                nombre: '',
                activo: false
            }}
                onSubmit={async valores => {
                    console.log(valores)
                }}
            >

                {(formikProps) => (
                    <Form>
                        <Input label='Nombre domiciliario' campo='nombres' type='text' placeholder="Nombre" />
                        <Input label='Apelñlido domiciliario' campo='apellidos' type='text' placeholder="Nombre" />
                        <label htmlFor="">¿Activo? ¿Inactivo?</label>
                        <Field className='form-check-input' id='activo' name='activo' type='checkbox' />


                        <Button className='btn btn-primary' type='submit'>Buscar</Button>

                    </Form>
                )}
            </Formik>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Nombres</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {domiciliarios?.map(domiciliario =>
                        <tr key={domiciliario.id}>
                            <td>{domiciliario.nombre}</td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    type='submit'
                                    onClick={() => setStateDomiciliario(true)}>
                                    Ver</button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {stateDomiciliario ? <Model title="Informacion Domiciliario">
                <Button className='btn btn-danger'
                    type='submit'
                    onClick={() => !setStateDomiciliario()}>
                    Cerrar</Button>
            </Model> : null}
        </>
    )
}