import axios from "axios";
import { obtennerToken } from "../Auth/manejadorJWT";

export function configurarInterceptor() {
    axios.interceptors.request.use(
        function (config) {
            const token = obtennerToken();
            if (token) {
                config.headers.Authorization = `bearer ${token}`;
            }

            return config;
        },
        function(error){
            return Promise.reject(error)
        }
    )
}