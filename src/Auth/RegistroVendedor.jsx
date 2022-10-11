import { Formik, Form } from "formik";
import { useState } from "react";
import Button from "../Utils/Button";
import FormGroupCheckBox from "../Utils/FormGroupCheckBox";
import Input from "../Utils/Input";

export default function RegistroVendedor() {

    const [facebook, setFacebook] = useState(false)
    const [instagram, setInstagram] = useState(false)

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
                telefonoCelular: null,
                facebook: '',
                instagram: '',
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
                                campo='facebook' placeholder='Link negocio o cuenta personal' />
                        }
                        <br />

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