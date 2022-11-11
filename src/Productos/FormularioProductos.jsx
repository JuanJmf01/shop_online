import axios from "axios";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from 'yup'
import { AutenticationContextt } from "../App";
import Button from "../Utils/Button";
import { urlUsuarios, urlVendedores } from "../Utils/endpoinds";
import FormGroupCheckBox from "../Utils/FormGroupCheckBox";
import FormGroupImagen from "../Utils/FormGroupImagen";
import Input from "../Utils/Input";
import SelectorMultiple from "../Utils/SelectorMultiple";

export default function FormularioProductos(props) {

    const [vendedor, setVendedor] = useState()
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState(mapear(props.categoriasSeleccionadas))
    const [categoriasNoSeleccionadas, setCategoriasNoSeleccionadas] = useState(mapear(props.categoriasNoSeleccionadas))
    const [oferta, setOferta] = useState(props.oferta)

    const { claims } = useContext(AutenticationContextt)


    function mapear(arreglo) {
        return arreglo.map(valor => {
            return { llave: valor.id, valor: valor.nombre }
        })
    }

    function obtenerNombreUsuario() {
        return claims.filter(x => x.nombre === 'email')[0]?.valor
    }

    function obtenerVendedor() {
        axios.get(`${urlVendedores}/${obtenerNombreUsuario()}`)
            .then((respuesta) => {
                setVendedor(respuesta.data.id)
                console.log("Arriba", respuesta.data.id)
            })
    }

    useState(() => {
        obtenerVendedor()
    }, [])

    return (
        <div className="p-3">
            <Formik
                initialValues={props.modelo}
                onSubmit={(valores, acciones) => {
                    valores.categoriasIds = categoriasSeleccionadas.map(valor => valor.llave)
                    valores.oferta = oferta
                    valores.vendedoresIds = [vendedor]
                    props.onSubmit(valores, acciones)
                }}

                validationSchema={Yup.object({
                    nombre: Yup.string().required('Este campo es requerido')

                })}
            >

                {(formikProps) => (
                    <Form>
                        <label htmlFor="">IMPORTANTE..!!</label>
                        <FormGroupCheckBox label='¿Producto en oferta?'
                            onChange={(e) => setOferta(e.currentTarget.checked)}
                            checked={oferta}
                            campo='oferta' />
                        <br />
                        {!oferta ? <div>
                            <Input type='text' campo='nombre' label='Nombre Producto' placeholder='nombre Producto' />
                            <Input type='number' campo='precio' label='Precio del producto' />
                            <Input type='text' campo='descripcion' label='Descripcion de producto' />
                            <Input type='number' campo='cantidadDisponible' label='Cantidad disponible' />
                        </div> : <div>
                            <Input type='text' campo='nombre' label='Titulo oferta' placeholder='...' />
                            <Input type='number' campo='precio' label='Precio de oferta' />
                            <Input type='text' campo='descripcion' label='Descripcion de oferta' />
                            <Input type='number' campo='cantidadDisponible' label='Cantidad disponible' />
                        </div>}

                        <br />
                        <FormGroupImagen campo='imagenProducto'
                            label={!oferta ? <>Imagen de producto</> : <>Imagen de oferta</>}
                            imagenURL={props.modelo.imagenProducto} />
                        <br />

                        <div className="form-group">
                            {<label>Categoria(s) de producto</label>}
                            <SelectorMultiple seleccionados={categoriasSeleccionadas}
                                noSeleccionados={categoriasNoSeleccionadas}
                                onChange={(seleccionados, noSeleccionados) => {
                                    setCategoriasSeleccionadas(seleccionados)
                                    setCategoriasNoSeleccionadas(noSeleccionados)
                                }}
                            />
                        </div>

                        <Button disabled={formikProps.isSubmitting} type='submit'>Enviar</Button>
                        <Link className='btn btn-secondary' to='/'>Cancelar</Link>
                    </Form>
                )}

            </Formik>
        </div>
    )
}