import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { rutas } from './route.config';
import './App.css'
import Menu from './Utils/Menu';
import { useState, useEffect } from 'react';
import { obtenerClaims } from './Auth/manejadorJWT'
import { configurarInterceptor } from './Utils/interceptores';

export const AutenticationContextt = React.createContext()

function App() {

  configurarInterceptor()
  const [claims, setClaims] = useState([])

  useEffect(() => {
    setClaims(obtenerClaims())
  }, [])

  function actualizar(claims) {
    setClaims(claims)
  }

  //Solo para las rutas
  function esAdmin() {
    //Si el usuario tiene un claim de nombre role y valor vendedor entonces el usuario es vendedor
    return claims.findIndex(claim => claim.nombre === 'role' && claim.valor === 'vendedor') > -1
  }


  return (
    <div>
      <BrowserRouter>
        <AutenticationContextt.Provider value={{ claims, actualizar }}>
          <Menu />
          <div className='container'>
            <Routes>
              {rutas.map(ruta =>
                <Route key={ruta.path} path={ruta.path}
                  element={ruta.esAdmin && !esAdmin() ? <>Acceso denegado, no estas autorizado</> : <ruta.componente />}>
                </Route>
              )}
            </Routes>
            <Routes />
          </div>
        </AutenticationContextt.Provider>

      </BrowserRouter>
    </div >
  );
}

export default App;
