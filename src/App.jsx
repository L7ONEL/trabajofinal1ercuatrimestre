import { Component } from "react";
import axios from 'axios'
import Registrar from './Componentes/Registrar';
import InicioSesion from './Componentes/InicioSesion';
import Regis_Persona from "./Componentes/Regis_Persona";
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
          registrarse: true
        }
      }

      registrarUsuario(user, pass, nombre, apellido, dni) {
        const url = "http://10.0.4.103:3001/api/registrar"
        const data = {
          user,
          pass,
          nombres: nombre,
          apellidos: apellido,
          documento: dni
        }
        
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


      }

      cambiarModo(registrarse) {
        this.setState({ registrarse })
      }
        
      iniciarSesion(user, pass) {
        const url = "http://10.0.4.103:3001/api/ingresar"
        const data = {
          user,
          pass,
        }
    
        axios.post(url, data)
          .then((response) => {
            this.setState({token: response.data.token});
            alert("Sesión iniciada correctamente.");
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
                     
                  
                </div>
            </div>
        )
    }
}
