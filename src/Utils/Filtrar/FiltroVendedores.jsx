import { Formik, Form, Field } from "formik"
import { useState } from "react"
import Button from "../Button"
import FormGroupCheckBox from "../FormGroupCheckBox"
import Input from "../Input"
import Model from "../Models/Model"

export default function FiltroVendedores() {

    const [stateVendedor, setStateVendedor] = useState(false)

    const vendedores = [
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
            <h3>Filtro vendedores</h3>
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
                        <Input label='Nombre vendedor' campo='nombre' type='text' placeholder="Nombre" />
                        <label htmlFor="">¿Activo? ¿Inactivo?</label>
                        <Field className='form-check-input' id='activo' name='activo' type='checkbox' />

                        <Button disabled={formikProps.isSubmitting}
                            className='btn btn-primary'
                            type='submit'>
                            Buscar</Button>
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
                    {vendedores?.map(vendedor =>
                        <tr key={vendedor.id}>
                            <td>{vendedor.nombre}</td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    type='submit'
                                    onClick={() => setStateVendedor(true)}>
                                    Ver</button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {stateVendedor ? <Model title="Informacion vendedor" subtitle='SubTitulo'>
                <Button className='btn btn-danger'
                    type='submit'
                    onClick={() => !setStateVendedor()}>
                    Cerrar</Button>
            </Model> : null}

        </>
    )
}