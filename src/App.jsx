
import { Component } from "react";
import axios from 'axios'
import Registrar from './Componentes/Registrar';
import InicioSesion from './Componentes/InicioSesion';
import Regis_Persona from "./Componentes/Regis_Persona";

import React, { Component } from "react";
import axios from 'axios';
import FiltrarPersonas from "./componentes/FiltrarPersonas";
import Personas from "./componentes/Personas";
import AgregarPersona from "./componentes/AgregarPersona";
import EditarPersona from "./componentes/EditarPersona";
import './App.css';
import eliminar from './assets/eliminar.png';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            contraseña: "",

            nombre: "",
            apellido: "",
            dni: "",

            registrarse: true,
            iniciar: false,
            personasTabla: false,
            agregar: false,
            editar: false,

            token: null,

            personas: []
        }
    }

    registrarUsuario(user, pass, nombre, apellido, dni) {
        const url = "https://personas.ctpoba.edu.ar/api/registrar";
        const data = {
            user,
            pass,
            nombres: nombre,
            apellidos: apellido,
            documento: dni
        };
        
        axios.post(url, data)

          .then((response) => {
            alert("Usuario registrado.");
            console.log(response.data);
            
            this.setState({ registrarse: false });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      registrarPersona(documento, nombres, apellidos, fechnac, telefono, domicilio, mail){
        const url = "http://personas.ctpoba.edu.ar/api/personas";
        const data = {
          documento: documento,
          nombre: nombres,
          apellido: apellidos,
          fechnac: fechnac,
          telefono: telefono,
          domicilio: domicilio,
          mail: mail,
        };
         axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
         })
         .then((response)=>{
          alert("Persona guardada.");
          console.log(response.data);
         })
         .catch((error)=>{
          console.log(error);
         }
        );


      };

      cambiarModo(registrarse) {
        this.setState({ registrarse })
      }
         
            .then((response) => {
                alert("Usuario registrado.");
                console.log(response.data);
                this.setState({ registrarse: false, iniciar: true, personasTabla: false, agregar: false, editar: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    cambiarModo(registrarse, iniciar, personasTabla, agregar, editar) {
        this.setState({ registrarse, iniciar, personasTabla, agregar, editar });
    }

        
    iniciarSesion(user, pass) {
        const url = "https://personas.ctpoba.edu.ar/api/ingresar";
        const data = {
            user,
            pass,
        };
    
        axios.post(url, data)
            .then((response) => {
                this.setState({ token: response.data.token, registrarse: false, iniciar: false, personasTabla: true, agregar: false, editar: false });
                console.log(response.data);
                alert("Sesión iniciada correctamente.");

                this.extraerPersonas(response.data.token, this.state.dni, this.state.nombre, this.state.apellido)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    extraerPersonas(token, dni, nombre, apellido) {
        const url = "https://personas.ctpoba.edu.ar/api/personas";
        const config = {
            headers: {
                authorization: token
            },
            params: {
                documento: dni,
                nombres: nombre,
                apellidos: apellido
            }
        };

        axios.get(url, config)
            .then((response) => {
                this.setState({ personas: response.data.personas })
                console.log(this.state.personas);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    registrarPersona(documento, nombres, apellidos, fechaNac, telefono, domicilio, mail) {
        const url = "https://personas.ctpoba.edu.ar/api/personas";
        const data = {
            documento,
            nombres,
            apellidos,
            fechaNac,
            telefono,
            domicilio,
            mail
        };
        
        axios.post(url, data)
            .then((response) => {
                alert("Persona registrada.");
                console.log(response.data);
                this.setState({ registrarse: false, iniciar: false, personasTabla: true, agregar: false, editar: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    eliminarPersona(token, persona_id) {
        const url = "https://personas.ctpoba.edu.ar/api/personas";
        const config = {
            headers: {
                authorization: token
            },
            params: {
                persona_id
            }
        };

        axios.delete(url, config)
            .then((response) => {
                alert("Se ha eliminado correctamente a la persona")
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    editarPersona(token, persona_id, documento, nombres, apellidos, fechaNac, telefono, domicilio, mail) {
        const url = "https://personas.ctpoba.edu.ar/api/personas";
        const data = {
            documento,
            nombres,
            apellidos,
            fechaNac,
            telefono,
            domicilio,
            mail
        };
        const config = {
            headers: {
                authorization: token
            },
            params: {
                persona_id
            }
        };

        axios.delete(url, data, config)
            .then((response) => {
                alert("Se ha actualizado correctamente los datos de la persona");
                console.log(response.data);
                this.setState({ registrarse: false, iniciar: false, personasTabla: true, agregar: false, editar: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='Cuerpo'>
                <div className='Lista'>

                  {this.state.registrarse ?
                    <Registrar 
                      registrarUsuario = {(user, pass, nombre, apellido, dni) => this.registrarUsuario(user, pass, nombre, apellido, dni)}
                      cambiarModo = {() => this.cambiarModo()}
                    />
                  :     
                    <InicioSesion 
                      iniciarSesion = {(user, pass) => this.iniciarSesion(user, pass)}
                      cambiarModo = {() => this.cambiarModo()}
                    />
            
                  }
                  <Regis_Persona 
                  registrarPersona = {(documento, nombres, apellidos, fechnac, telefono, domicilio, mail) => this.registrarPersona(documento, nombres, apellidos, fechnac, telefono, domicilio, telefono)}/>
                     
                  

                    {this.state.registrarse &&

                        <Registrar 
                            registrarUsuario={(user, pass, nombre, apellido, dni) => this.registrarUsuario(user, pass, nombre, apellido, dni)}
                            cambiarModo={() => this.cambiarModo(false, true, false, false, false)}
                        />

                    } {this.state.iniciar &&

                        <InicioSesion 
                            iniciarSesion={(user, pass) => this.iniciarSesion(user, pass)}
                            cambiarModo={() => this.cambiarModo(true, false, false, false, false)}
                        />

                    } {this.state.personasTabla &&
                        
                        <div className="Cuadro">
                            <FiltrarPersonas 
                                token = {this.state.token}
                                extraerPersonas = {(dni, nombre, apellido) => this.extraerPersonas(this.state.token, dni, nombre, apellido)}
                            />

                            <div style={{marginTop: '10px'}}>
                                <table className="Tabla">
                                    <thead className="Titulos">
                                        <tr>
                                            <th>DNI</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Fec. Nac.</th>
                                            <th>Telefono</th>
                                            <th>Domicilio</th>
                                            <th>E-mail</th>
                                            <th>Opciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.personas.map((cont, index) => 
                                            <Personas
                                                key={index}
                                                documento = {cont.documento}
                                                nombres = {cont.nombres}
                                                apellidos = {cont.apellidos}
                                                fechaNac = {cont.fechaNac}
                                                telefono = {cont.telefono}
                                                domicilio = {cont.domicilio}
                                                mail = {cont.mail}
                                                eliminar = {eliminar}
                                                eliminarPersona = {(token, persona_id) => this.eliminarPersona(token, persona_id)}
                                                token = {this.state.token}
                                            />
                                        )}
                                    </tbody>
                                </table>

                                <button 
                                    className="Boton"
                                    onClick={() => this.cambiarModo(false, false, false, true, false)}
                                >Agregar persona</button>

                                <button 
                                    className="Boton"
                                    style={{ marginLeft: "535px" }}
                                    onClick={() => this.cambiarModo(false, false, false, false, true)}
                                >Editar persona</button>
                            </div>
                        </div>

                    } {this.state.agregar && 
                        
                        <AgregarPersona 
                            accion = {(documento, nombres, apellidos, fechaNac, telefono, domicilio, mail) => this.registrarPersona(documento, nombres, apellidos, fechaNac, telefono, domicilio, mail)}
                        />

                    } {this.state.editar &&

                        <EditarPersona 
                            token = {this.state.token}
                            accion = {(token, persona_id, documento, nombres, apellidos, fechaNac, telefono, domicilio, mail) => this.editarPersona(token, persona_id, documento, nombres, apellidos, fechaNac, telefono, domicilio, mail)}
                        />

                    }
                    
                </div>
            </div>
        );
    }
  
