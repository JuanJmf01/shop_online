import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { rutas } from './route.config';
import './App.css'
import Menu from './Utils/Menu';
import { useState } from 'react';

export const AutenticationContextt = React.createContext()

function App() {

  const [claims, setClaims] = useState([{ nombre: 'role', valor: 'vendedor' }])

  function actualizar(claims) {
    setClaims(claims)
  }

  // useEffect(() =>{
  //   setClaims(obtenerClaims())
  // }, [])

  function esAdmin() {
    return claims.findIndex(claim => claim.nombre === 'role' && claim.valor === 'vendedor')
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
                  element={ruta.esAdmin && esAdmin() ? <>Acceso denegado, no estas autorizado</> : <ruta.componente />}>
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
