import React,{Fragment, useState} from 'react';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    const [cita, actualizarCita] = useState({
        id: '',
        mascota : '',
        dueno : '',
        fecha: '',
        hora: '',
        sintomas: ''

    });

    const [error,actualizarError] = useState(false);

    const actualizarState = e => {
        actualizarCita({ 
            ...cita //copia cita para no reescribir y seguir añadiendo
            ,[e.target.name] : e.target.value
        });
    }

    //Extraer los valores
    const {mascota, dueno, fecha, hora, sintomas } = cita;
    const createUId = () => {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    //Cuando le da submit
    const submitCita = e => {
        e.preventDefault();
        //Validar
        if(mascota.trim() === '' || dueno.trim() === '' || fecha.trim() === '' ||
        hora.trim() === '' || sintomas.trim() === '' ) {
            actualizarError(true)
            return;
        };
        //Asignar ID
        actualizarError(false);
        cita.id=createUId();
        //Crea Cita
        crearCita(cita);
        //Reinicia form
        actualizarCita({
            id: '',
            mascota : '',
            dueno : '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return ( 
        <Fragment>
            <h2>¡Separa tu cita!</h2>
            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}
            <form 
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                    />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="dueno"
                    className="u-full-width"
                    placeholder="Nombre Dueño"
                    onChange={actualizarState}
                    value={dueno}
                    />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                    />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                    />
                <label>Sintomas</label>
                <textarea 
                className="u-full-width"
                name="sintomas" 
                onChange={actualizarState}
                value={sintomas}
                >
                </textarea>
                <button
                  type="submit"
                  className="u-full-width button-primary"
                >Separar cita

                </button>
            </form>
        </Fragment>

     );
}

Formulario.protoTypes = {
    crearCita : PropTypes.func.isRequired
  }

export default Formulario;