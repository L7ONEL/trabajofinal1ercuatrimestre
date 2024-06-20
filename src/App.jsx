import React, { Component } from "react";
import axios from 'axios';
import Registrar from './componentes/Registrar';
import InicioSesion from "./componentes/InicioSesion";
import FiltrarPersonas from "./componentes/FiltrarPersonas";
import Usuarios from "./componentes/Usuarios";
import './App.css';

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
                this.setState({ registrarse: false, iniciar: true, personasTabla: false });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    cambiarModo(registrarse, iniciar, personasTabla) {
        this.setState({ registrarse, iniciar, personasTabla });
    }
        
    iniciarSesion(user, pass) {
        const url = "https://personas.ctpoba.edu.ar/api/ingresar";
        const data = {
            user,
            pass,
        };
    
        axios.post(url, data)
            .then((response) => {
                this.setState({ token: response.data.token, registrarse: false, iniciar: false, personasTabla: true });
                console.log(response.data);
                alert("Sesión iniciada correctamente.");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    extraerPersonas(token, dni, nombre, apellido) {
        const url = "https://personas.ctpoba.edu.ar/api/personas";
        const config = {
            header: {
                authorization: token
            },
            params: {
                dni,
                nombre,
                apellido
            }
        };

        
    }

    render() {
        return (
            <div className='Cuerpo'>
                <div className='Lista'>
                    {this.state.registrarse &&

                        <Registrar 
                            registrarUsuario={(user, pass, nombre, apellido, dni) => this.registrarUsuario(user, pass, nombre, apellido, dni)}
                            cambiarModo={() => this.cambiarModo(false, true, false)}
                        />

                    } {this.state.iniciar &&

                        <InicioSesion 
                            iniciarSesion={(user, pass) => this.iniciarSesion(user, pass)}
                            cambiarModo={() => this.cambiarModo(true, false, false)}
                        />

                    } {this.state.personasTabla &&
                        
                        <div className="Cuadro">
                            <FiltrarPersonas 
                                dni = {this.state.dni}
                                nombre = {this.state.nombre}
                                apellido = {this.state.apellido}
                                extraerPersonas = {(dni, nombre, apellido) => this.extraerPersonas(this.state.token, dni, nombre, apellido)}
                            />
                            {this.state.personas.map((cont, index) => 
                                <table>
                                    <Usuarios 
                                        documento = {cont.documento}
                                        nombres = {cont.nombres}
                                        apellidos = {cont.apellidos}
                                        fechaNac = {cont.fechaNac}
                                        telefono = {cont.telefono}
                                        domicilio = {cont.domicilio}
                                        mail = {cont.mail}
                                    />
                                </table>
                            )}
                        </div>

                    }
                    
                </div>
            </div>
        );
    }
}
