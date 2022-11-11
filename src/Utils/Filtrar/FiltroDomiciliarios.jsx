import { Field, Form, Formik } from "formik";
import { useState } from "react";
import Button from "../Button";
import FormGroupCheckBox from "../FormGroupCheckBox";
import Input from "../Input";
import Model from "../Models/Model";

export default function FiltroDomiciliarios() {

    const [stateDomiciliario, setStateDomiciliario] = useState(false)

    const domiciliarios = [
        {
            id: 1,
            nombre: 'Tuco salamanca'
        },
        {
            id: 2,
            nombre: 'Francisco'
        },
        {
            id: 3,
            nombre: 'Maria Fernanada'
        }
    ]

    return (
        <>
        <div class="container-fluid col-8 mt-5">
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
                            <Input label='Nombre domiciliario' campo='nombre' type='text' placeholder="Nombre" />
                            <Field className='form-check-input' id='activo' name='activo' type='checkbox' />
                            <label htmlFor="">¿Activo?</label>
                            


                            <Button className='btn btn-outline-secondary mt-1' type='submit'>Buscar</Button>

                        </Form>
                    )}
            </Formik>

                <table className='table table-striped mt-3'>
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
                                        className='btn btn-outline-secondary mt-1'
                                        type='submit'
                                        onClick={() => setStateDomiciliario(true)}>
                                        Ver</button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {stateDomiciliario ? <Model title="Informacion Domiciliario">
                <Button className='btn btn-danger'
                    type='submit'
                    onClick={() => !setStateDomiciliario()}>
                    Cerrar</Button>
            </Model> : null}
        </>
    )
}