import { Form, Formik } from "formik";
import Button from "../Utils/Button";
import Input from "../Utils/Input";

export default function Login() {
    return (
        <>
            <h3>Login</h3>
            <Formik initialValues={{
                email: '',
                contraseña: ''
            }}
                onSubmit={valores => console.log(valores)}
            >


                {formikProps => (
                    <Form>
                        <Input type='text' label='Email' campo='email' placeholder='Email' />
                        <Input type='password' label='Contraseña' campo='contraseña' placeholder='Contraseña' />

                        <Button disabled={formikProps.isSubmitting} className='btn btn-success' type='submit'>
                            Ingresar
                        </Button>

                    </Form>
                )}

            </Formik>
        </>
    )
}