import React, {Fragment, useState,useEffect} from 'react'
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';

function App() {


  //Citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }
  //Citas Main
  const [citas,guardarCitas] = useState(citasIniciales);

  //Detecta algun cambio en tu aplicaciòn/state
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales) {
      localStorage.setItem('citas',JSON.stringify(citas));
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
  },[citas]);


  const crearCita = cita => {
      guardarCitas([...citas,cita]);
  };

  const eliminarCita = id => {
     const nuevasCitas = citas.filter(cita => cita.id !== id);
     guardarCitas(nuevasCitas);
  }


  return (
    <Fragment>
      <h1>ADMINISTRADOR DE CITAS</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita = {crearCita}
              />
          </div>
          <div className="one-half column">
             <h2>Citas agendadas</h2>
             {
               citas.length === 0 ? <p className="cita">No hay citas agendadas</p> :
             
             citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
          </div>
         </div>

      </div>∫
    </Fragment>
  );
}



export default App;
