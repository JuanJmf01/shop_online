import { Formik, Form } from "formik";
import Button from "../Utils/Button";
import Input from "../Utils/Input";

export default function RegistroVendedor() {
    return (
        <>
            <h3>Registra tu negocio</h3>
            <Formik initialValues={{
                nombres: '',
                apellidos: '',
                email: '',
                cedula: null,
                nombreNegocio: '',
                descripcionNegocio: '',
                telefonoCelular: null,
                redSocialPrincipal: '',
                redSocialSecundaria: '',
                contraseña: ''
            }}
                onSubmit={async valores => {
                    await new Promise(r => setTimeout(r, 1000))
                    console.log(valores)
                }}
            >

                {formikProps => (
                    <Form>
                        <Input type='text' label='Nombres' campo='nombres' placeholder='Nombres' />
                        <Input type='text' label='Apellidos' campo='apellidos' placeholder='Apellidos' />
                        <Input type='text' label='Email' campo='email' placeholder='##' />
                        <Input type='number' label='Cedula' campo='Cedula' placeholder='Cedula' />
                        <Input type='text' label='Nombre del negocio' campo='nombreNegocio' placeholder='##' />
                        <Input type='text' label='Descripcion del negocio' campo='descripcionNegocio' placeholder='##' />
                        <Input type='text' label='Red social Principal' campo='redSosialPrincipal' placeholder='##' />
                        <Input type='text' label='Red social secundaria' campo='redSosialSecundaria' placeholder='##' />
                        <Input type='password' label='Contraseña' campo='contraseña' placeholder='Contraseña' />

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