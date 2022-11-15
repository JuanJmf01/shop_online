import Swal from 'sweetalert2'

export default function confirmar(onConfirm,
    titulo = '¿Desea borrar el registro?',
    textoBotonConfirmacion = "Borrar"
) {
    Swal.fire({
        title: titulo,
        confirmButtonText: textoBotonConfirmacion,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor : '#d33'
    }).then(result => {
        if(result.isConfirmed){
            onConfirm()
        }

    })
}


