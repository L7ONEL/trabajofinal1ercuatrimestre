import React, { Component } from "react";
import axios from 'axios';
import Registrar from './componentes/Registrar';
import InicioSesion from "./componentes/InicioSesion";
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
                if (response.data.status == "ok") {      
                    alert("Usuario registrado.");
                    this.setState({ registrarse: false, iniciar: true, personasTabla: false, agregar: false, editar: false });
                } else {
                    alert("Hubo un error al registrar el usuario.")
                }
                console.log(response.data);
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
                if (response.data.status) {
                    alert("Sesión iniciada correctamente.");
                    this.setState({ token: response.data.token, registrarse: false, iniciar: false, personasTabla: true, agregar: false, editar: false });
                    
                    this.extraerPersonas(response.data.token, this.state.dni);
                } else {
                    alert("Hubo un error al iniciar sesión, compruebe que los datos ingresados son correctos.")
                }
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    extraerPersonas(token, documento) {
        const url = "https://personas.ctpoba.edu.ar/api/personas";
        const config = {
            headers: {
                authorization: token
            },
            params: {
                busqueda: documento
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

    registrarPersona(token, documento, nombres, apellidos, fechaNac, telefono, domicilio, mail) {
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
        }
        
        axios.post(url, data, config)
            .then((response) => {
                console.log(response.data);
                if (response.data.status == "ok") {
                    alert("Persona registrada correctamente.");
                
                    this.setState({ registrarse: false, iniciar: false, personasTabla: true, agregar: false, editar: false });
                    this.extraerPersonas(this.state.token, this.state.dni)
                } else {
                    alert("Ocurrio un error al registrar a la persona.")
                }
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
        console.log(config);

        axios.delete(url, config)
            .then((response) => {
                if (response.data.status = "ok") {
                    alert("Se ha eliminado correctamente a la persona");

                    this.extraerPersonas(this.state.token, this.state.dni)
                } else {
                    alert('Hubo un error al eliminar a la persona.')
                }

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

        axios.put(url, data, config)
            .then((response) => {
                if (response.data.status == "ok") {
                    alert("Se ha actualizado correctamente los datos de la persona");

                    this.extraerPersonas(this.state.token, this.state.dni)
                    this.setState({ registrarse: false, iniciar: false, personasTabla: true, agregar: false, editar: false });
                } else {
                    alert("Hubo un inconveniente al editar los datos de la persona.")
                }
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='Cuerpo'>
                <div className='Lista'>
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
                                extraerPersonas = {(token, documento) => this.extraerPersonas(token, documento)}
                            />

                            <div style={{marginTop: '10px'}}>
                                <table className="Tabla">
                                    <thead className="Titulos">
                                        <tr>
                                            <th>ID_Persona</th>
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
                                                id = {cont._id}
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

                                <div style={{flexDirection: "row"}}>
                                    <div style={{float: "left"}}>
                                        <button 
                                            className="Boton"
                                            onClick={() => this.cambiarModo(false, false, false, true, false)}
                                        >Agregar persona</button>
                                    </div>
                                    <div style={{float: "right"}}>
                                       <button 
                                            className="Boton"
                                            onClick={() => this.cambiarModo(false, false, false, false, true)}
                                        >Editar persona</button> 
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    } {this.state.agregar && 
                        
                        <AgregarPersona 
                            token = {this.state.token}
                            accion = {(token, documento, nombres, apellidos, fechaNac, telefono, domicilio, mail) => this.registrarPersona(token, documento, nombres, apellidos, fechaNac, telefono, domicilio, mail)}
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
}
