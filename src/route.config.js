import ClienteOVendedor from "./Auth/ClienteOVendedor";
import Login from "./Auth/Login";
import RegistroCliente from "./Auth/RegistroCliente";
import RegistroVendedor from "./Auth/RegistroVendedor";
import IndiceOfertas from "./Ofertas/IndiceOfertas";
import InformacionNegocio from "./Perfil/InformacionNegocio";
import InformacionPersonal from "./Perfil/InformacionPersonal";
import DetalleProducto from "./Productos/DetalleProducto";
import CrearProducto from "./Productos/Pages/CrearProducto";
import EditarProducto from "./Productos/Pages/EditarProducto";
import MisProductos from "./Productos/Pages/MisProductos";
import FiltroDomiciliarios from "./Utils/Filtrar/FiltroDomiciliarios";
import FiltroProductos from "./Utils/Filtrar/FiltroProductos";
import FiltroVendedores from "./Utils/Filtrar/FiltroVendedores";
import IndiceFiltros from "./Utils/Filtrar/IndiceFiltros";
import Productos from "./Utils/Productos";
import IndiceVentas from "./Ventas/IndiceVentas";

export const rutas = [
    { path: '/login', componente: Login },
    { path: '/clienteO_vendedor', componente: ClienteOVendedor },
    { path: '/registroCliente', componente: RegistroCliente },
    { path: '/registroVendedor', componente: RegistroVendedor },


    { path: '/productos', componente: Productos },
    { path: '/misProductos', componente: MisProductos, esAdmin: false },
    { path: '/productos/crear', componente: CrearProducto, esAdmin: false },
    { path: '/productos/editar/:id', componente: EditarProducto, esAdmin: false },
    { path: '/productos/:id', componente: DetalleProducto },

    
    { path: '/filtro', componente: IndiceFiltros },
    { path: '/filtro/productos', componente: FiltroProductos },
    { path: '/filtro/vendedores', componente: FiltroVendedores },
    { path: '/filtro/domiciliarios', componente: FiltroDomiciliarios },


    { path: '/misVentas', componente: IndiceVentas, esAdmin: true },


    { path: '/ofertas', componente: IndiceOfertas },



    { path: '/personalInformacion', componente: InformacionPersonal },
    { path: '/informacionNegocio', componente: InformacionNegocio },




]