import { Component } from "react";

export default class Regis_Persona extends Component{
    constructor(props){
        super(props)
        this.state = {
            documento: "",
            nombres:"",
            apellidos:"",
            fechnac:"",
            telefono:"",
            domicilio:"",
            mail:""

        }
    }


    render(){
        return(
            <div className="Personas">
                <h2>Crear Persona</h2>

                <input
                type="number"
                placeholder="Numero de documento"
                onChange={(e)=> this.setState({documento:e.target.value}) }
                required
                />
                <input
                type="text"
                placeholder="Nombre"
                onChange={(e)=> this.setState({nombres:e.target.value})}
                required
                />
                <input
                type="text"
                placeholder="Apellido"
                onChange={(e)=> this.setState({apellidos:e.target.value})}
                required
                />
                <input
                type="date"
                placeholder="Fecha de nacimiento"
                onChange={(e)=> this.setState({fechnac:e.target.value})}
                required
                />
                <input
                type="number"
                placeholder="Telefono"
                onChange={(e)=> this.setState({telefono:e.target.value})}
                required
                />
                <input
                type="text"
                placeholder="domicilio"
                onChange={(e)=> this.setState({domicilio:e.target.value})}
                required
                />
                <input
                type="email"
                placeholder="Correo electronico"
                onChange={(e)=> this.setState({mail:e.target.value})}
                required
                />

                <button className="Boton">Guardar</button>


            </div>
        )
    }
} 