import ClienteOVendedor from "./Auth/ClienteOVendedor";
import Login from "./Auth/Login";
import RegistroCliente from "./Auth/RegistroCliente";
import RegistroVendedor from "./Auth/RegistroVendedor";
import IndiceOfertas from "./Ofertas/IndiceOfertas";
import InformacionPersonal from "./Perfil/InformacionPersonal";
import IndiceProductos from "./Productos/IndiceProductos";

export const rutas = [
    { path: '/login', componente: Login },
    { path: '/clienteO_vendedor', componente: ClienteOVendedor },
    { path: '/registroCliente', componente: RegistroCliente },
    { path: '/registroVendedor', componente: RegistroVendedor },


    { path: '/ofertas', componente: IndiceOfertas },
    { path: '/personalInformacion', componente: InformacionPersonal },
    { path: '/productos', componente: IndiceProductos },



]