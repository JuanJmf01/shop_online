import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import Button from "../Utils/Button";
import Input from "../Utils/Input";

export default function RegistroCliente() {
    return (
        <>
            <h3>Registrarse como cliente</h3>
            <Formik initialValues={{
                nombres: '',
                apellidos: '',
                email: '',
                telefonoCelular: null,
                contraseña: ''
            }}
                onSubmit={valores => console.log(valores)}
            >


                {formikProps => (
                    <Form>
                        <Input type='text' label='Nombres' campo='nombres' placeholder='Nombres' />
                        <Input type='text' label='Apellidos' campo='apellidos' placeholder='Apellidos' />
                        <Input type='text' label='Email' campo='email' placeholder='Email' />
                        <Input type='number' label='Numero Celular' campo='telefonoCelular' placeholder='...' />
                        <Input type='password' label='Contraseña' campo='contraseña' placeholder='Contraseña' />

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