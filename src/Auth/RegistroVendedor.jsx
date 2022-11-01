import axios from "axios";
import { Formik, Form } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AutenticationContextt } from "../App";
import Button from "../Utils/Button";
import { urlCuentas, urlVendedores } from "../Utils/endpoinds";
import FormGroupCheckBox from "../Utils/FormGroupCheckBox";
import Input from "../Utils/Input";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";



export default function RegistroVendedor() {

    const [facebook, setFacebook] = useState(false)
    const [instagram, setInstagram] = useState(false)

    const { actualizar } = useContext(AutenticationContextt)
    const navigate = useNavigate()


    async function registroPrincipal(credenciales) {
        try {
            const respuesta = await axios.post(`${urlCuentas}/CrearCliente`, credenciales)
            guardarTokenLocalStorage(respuesta.data)
            actualizar(obtenerClaims())
            console.log(respuesta.data)
            registroSecundario(credenciales)
            navigate('/login')
        }catch(error){
            console.log(error.response.data)
        }
    }

    async function registroSecundario(credenciales) {
        try {
            await axios.post(urlVendedores, credenciales)
        }
        catch (error) {
            console.error(error.response.data)
        }
    }


    return (
        <>
            <h3>Registra tu negocio</h3>
            <Formik initialValues={{
                nombres: '',
                apellidos: '',
                email: '',
                numeroCelular: null,
                nombreNegocio: '',
                descripcionNegocio: '',
                facebook: '',
                instagram: '',
                password: ''
            }}
                onSubmit={async valores => {
                    await registroPrincipal(valores)
                    console.log(valores)
                }}
            >

                {formikProps => (
                    <Form>
                        <Input type='text' label='Nombres' campo='nombres' placeholder='Nombres' />
                        <Input type='text' label='Apellidos' campo='apellidos' placeholder='Apellidos' />
                        <Input type='text' label='Email' campo='email' placeholder='Email' />
                        <Input type='number' label='Numero celular' campo='numeroCelular' placeholder='Numero asociado a WhatsApp' />
                        <Input type='text' label='Nombre del negocio' campo='nombreNegocio' placeholder='##' />
                        <Input type='text' label='Descripcion del negocio' campo='descripcionNegocio' placeholder='##' />
                        <br />
                        <FormGroupCheckBox label='Facebook?' campo='facebook'
                            onChange={(e) => setFacebook(e.currentTarget.checked)} checked={facebook} />
                        {!facebook ? <></> :
                            <Input type='text' label='Link negocio/cuenta-personal'
                                campo='facebook' placeholder='Link negocio o cuenta personal' />
                        }
                        <br />
                        <FormGroupCheckBox label='Instagram?' campo='instagram'
                            onChange={(e) => setInstagram(e.currentTarget.checked)} checked={instagram} />
                        {!instagram ? <></> :
                            <Input type='text' label='Link negocio/cuenta-personal'
                                campo='instagram' placeholder='Link negocio o cuenta personal' />
                        }
                        <br />

                        <Input type='password' label='Contraseña' campo='password' placeholder='Contraseña' />
                        <div>
                            <Button disabled={formikProps.isSubmitting} className='btn btn-primary' type='submit'>
                                Registrar
                            </Button>
                        </div>

                    </Form>
                )}

            </Formik>
        </>
    )
}