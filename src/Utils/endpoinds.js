// Acceso al valor que hay en la variable de entorno (REACT_APP_API_URL)
const apiURL = process.env.REACT_APP_API_URL;

export const urlProductos = `${apiURL}/productos`