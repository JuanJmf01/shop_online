import axios from "axios";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AutenticationContextt } from "../App";
import Button from "../Utils/Button";
import { urlCuentas } from "../Utils/endpoinds";
import Input from "../Utils/Input";
import { guardarTokenLocalStorage, obtenerClaims } from "./manejadorJWT";

export default function Login() {

    const { actualizar } = useContext(AutenticationContextt)
    const navigate = useNavigate()

    async function login(credenciales) {
        try {
            const respuesta = await
                axios.post(`${urlCuentas}/login`, credenciales)
            guardarTokenLocalStorage(respuesta.data)
            actualizar(obtenerClaims())
            console.log(respuesta.data)
            navigate('/productos')

        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <>
            <h3>Login</h3>
            <Formik initialValues={{
                email: '',
                password: ''
            }}
                onSubmit={async valores => {
                    await login(valores)
                    console.log(valores)
                }}
            >
                {formikProps => (
                    <Form>
                        <Input type='text' label='Email' campo='email' placeholder='Email' />
                        <Input type='password' label='Contraseña' campo='password' placeholder='Contraseña' />

                        <Button disabled={formikProps.isSubmitting} className='btn btn-success' type='submit'>
                            Ingresar
                        </Button>

                    </Form>
                )}

            </Formik>
        </>
    )
}