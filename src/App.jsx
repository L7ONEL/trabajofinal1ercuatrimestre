import { Component } from "react";
import axios from 'axios'
import Registrar from './Componentes/Registrar';
import InicioSesion from './Componentes/InicioSesion';
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
            
            this.setState({ registrarse: false })
          })
          .catch((error) => {
            console.log(error);
          });
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
                </div>
            </div>
        )
    }
}
