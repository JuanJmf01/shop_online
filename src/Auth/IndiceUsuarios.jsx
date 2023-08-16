import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "../Utils/Button";
import confirmar from "../Utils/ConfirmarAccion";
import { urlCuentas, urlVendedores } from "../Utils/endpoinds";

export default function IndiceUsuarios() {

    const [vendedores, setVendedores] = useState([]);

    async function hacerAdmin(email) {
        axios.get(`${urlCuentas}/${email}`)
            .then((respuesta) => {
                editarAdmin(`${urlCuentas}/hacerVendedor`, respuesta.data.id);
            })
    }

    async function removerAdmin(email) {
        axios.get(`${urlCuentas}/${email}`)
            .then((respuesta) => {
                editarAdmin(`${urlCuentas}/removerVendedor`, respuesta.data.id);
            })
    }

    async function editarAdmin(url, id) {
        await axios.post(url, JSON.stringify(id),
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )

        Swal.fire({
            title: 'Exito',
            text: 'Operación realizada con éxito',
            icon: 'success'
        })
    }

    useEffect(() => {
        axios.get(`${urlVendedores}/listadoVendedores`)
            .then((respuesta) => {
                console.log(respuesta.data)
                setVendedores(respuesta.data)
            })
    }, [])

    return (
        <>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {vendedores?.map(vendedor => <tr key={vendedor.id}>
                        <td>
                            <div style={{ display: "flex" }}>
                                <Button className="btn btn-outline-secondary"
                                    onClick={() => confirmar(() => hacerAdmin(vendedor.email),
                                        `¿Desea hacer a ${vendedor.email} vendedor?`, 'Realizar'
                                    )}>Hacer vendedor
                                </Button>


                                <Button className="btn btn-outline-danger"
                                    onClick={() => confirmar(() => removerAdmin(vendedor.email),
                                        `¿Desea remover a ${vendedor.email} vendedor?`, 'Realizar'
                                    )}>Remover vendedor
                                </Button>

                            </div>


                        </td>
                        <td>
                            {vendedor.email}
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}