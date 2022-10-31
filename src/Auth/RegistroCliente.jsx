import axios from "axios";
import { Formik, Form } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AutenticationContextt } from "../App";
import Button from "../Utils/Button";
import { urlCuentas, urlUsuarios } from "../Utils/endpoinds";
import Input from "../Utils/Input";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";

export default function RegistroCliente() {

    const { actualizar } = useContext(AutenticationContextt)
    const navigate = useNavigate()
    
    async function registroPrincipal(credenciales) {
        try {
            const respuesta = await axios.post(`${urlCuentas}/CrearCliente`, credenciales)
            guardarTokenLocalStorage(respuesta.data)
            actualizar(obtenerClaims())
            console.log(respuesta.data)
            navigate('/login')
        }catch(error){
            console.log(error.response.data)
        }
    }

    async function registroSecundario(credenciales) {
        try {
            await axios.post(urlUsuarios, credenciales)
        }
        catch (error) {
            console.error(error.response.data)
        }
    }

    return (
        <>
            <h3>Registrarse como cliente</h3>
            <Formik initialValues={{
                nombres: '',
                apellidos: '',
                email: '',
                numeroCelular: null,
                password: ''
            }}
                onSubmit={async valores => {
                    await registroPrincipal(valores)
                    await registroSecundario(valores)
                    console.log(valores)
                }}
            >

                {formikProps => (
                    <Form>
                        <Input type='text' label='Nombres' campo='nombres' placeholder='Nombres' />
                        <Input type='text' label='Apellidos' campo='apellidos' placeholder='Apellidos' />
                        <Input type='text' label='Email' campo='email' placeholder='Email' />
                        <Input type='text' label='Numero Celular' campo='numeroCelular' placeholder='...' />
                        <Input type='password' label='Contraseña' campo='password' placeholder='Contraseña' />

                        <Button disabled={formikProps.isSubmitting} className='btn btn-primary' type='submit'>
                            Enviar
                        </Button>
                        <Link className='btn btn-secondary' to='/'>Cancelar</Link>

                    </Form>
                )}

            </Formik>

        </>
    )
}