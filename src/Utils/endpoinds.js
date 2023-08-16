// Acceso al valor que hay en la variable de entorno (REACT_APP_API_URL)
const apiURL = process.env.REACT_APP_API_URL;

export const urlCuentas = `${apiURL}/cuentas`

export const urlProductos = `${apiURL}/productos`
export const urlCategorias = `${apiURL}/categorias`
export const urlVendedores = `${apiURL}/vendedores`
export const urlUsuarios = `${apiURL}/usuarios`
export const urlRatings = `${apiURL}/rating`
export const urlCompras = `${apiURL}/misCompras`
export const urlVentas = `${apiURL}/misVentas`
export const urlMedioPago = `${apiURL}/mediosDePago`
export const urlComprobantePago = `${apiURL}/comprobantePago`

