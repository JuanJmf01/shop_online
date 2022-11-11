import axios from "axios"
import { Formik, Form, Field } from "formik"
import { useState } from "react"
import { useEffect } from "react"
import ListadoDeProductos from "../../Productos/ListadoDeProductos"
import Button from "../Button"
import { urlCategorias, urlProductos } from "../endpoinds"
import Input from "../Input"

export default function FiltroProductos() {

    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([])

    const valorInicial = {
        nombre: '',
        categoriaId: 0,
        oferta: false
    }

    useEffect(() => {
        axios.get(urlCategorias)
            .then((respuesta) => {
                setCategorias(respuesta.data)
            })
    }, [])

    useEffect(() => {
        filtrar(valorInicial)
    }, [])

    function filtrar(valores) {
        axios.get(`${urlProductos}/filtrar`, { params: valores })
            .then((respuesta) => {
                setProductos(respuesta.data)
            })
    }

    return (
        <>
        <div class="container-fluid col-8 mt-5">
            <h3 class=" " >Buscar Producto</h3>
            <Formik initialValues={valorInicial}
                onSubmit={async valores => {
                    filtrar(valores)
                }}
            >

                {(formikProps) => (
                    <Form>
                        
                            <Input label='Nombre producto' campo='nombre' type='text' placeholder="Nombre" />
                            <label>Categoria</label>
                            <div className="form-group mb-2">
                                <select className="form-control"
                                    {...formikProps.getFieldProps('categoriaId')}
                                >
                                    <option value="0">--Seleccione una categoria --</option>
                                    {categorias.map(categoria =>
                                        <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
                                </select>
                            </div>
                            <Field className='form-check-input mr-1 ml-1' id='oferta' name='oferta' type='checkbox' />
                            <label htmlFor="oferta"> ¿Producto en oferta?</label>


                            <div style={{display: 'flex'}}>
                                <Button disabled={formikProps.isSubmitting}
                                    className='btn btn-outline-secondary mt-1'
                                    type='submit'><i class="glyphicon glyphicon-search"></i>
                                    Buscar</Button>

                                <Button
                                    className='btn btn-outline-danger mt-1'
                                    type='submit'
                                    onClick={() => {
                                        formikProps.setValues(valorInicial)
                                        filtrar(valorInicial)
                                    }}
                                >Limpiar</Button>
                            </div>
                    </Form>
                )}

            </Formik>

            <ListadoDeProductos productos={productos} />
        </div>
        </>
    )
}