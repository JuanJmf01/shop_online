import axios from "axios"
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import { useEffect } from "react"
import Button from "../Button"
import { urlCategorias } from "../endpoinds"
import Input from "../Input"

export default function FiltroProductos() {

    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        axios.get(urlCategorias)
            .then((respuesta) => {
                setCategorias(respuesta.data)
                console.log(respuesta.data)
            })
    }, [])

    return (
        <>
            <h3>Filtro Producto</h3>
            <Formik initialValues={{
                nombre: '',
                categoria: '',
                oferta: false
            }}
                onSubmit={async valores => {
                    console.log(valores)
                }}
            >

                {(formikProps) => (
                    <Form>
                        <Input label='Nombre producto' campo='nombre' type='text' placeholder="Nombre" />
                        <label>Categoria</label>
                        <div className="form-group mx-sm-3 mb-2">
                            <select className="form-control"
                                {...formikProps.getFieldProps('categoria')}
                            >
                                <option value="0">--Seleccione una categoria --</option>
                                {categorias.map(categoria =>
                                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
                            </select>
                        </div>
                        <Field className='form-check-input' id='oferta' name='oferta' type='checkbox' />
                        <label htmlFor="oferta">¿Producto en oferta?</label>


                        <Button disabled={formikProps.isSubmitting}
                            className='btn btn-primary'
                            type='submit'>
                            Buscar</Button>

                    </Form>
                )}




            </Formik>
        </>
    )
}