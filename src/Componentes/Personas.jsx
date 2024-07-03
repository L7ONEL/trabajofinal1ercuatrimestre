import React, { Component } from 'react';
import editar from "../assets/editar.png";
import eliminar from "../assets/eliminar.png"

export default class Personas extends Component {
  render() {
    return (
      <tr>
        <th>{this.props.id}</th>
        <th>{this.props.documento}</th>
        <th>{this.props.nombres}</th>
        <th>{this.props.apellidos}</th>
        <th>{this.props.fechaNac}</th>
        <th>{this.props.telefono}</th>
        <th>{this.props.domicilio}</th>
        <th>{this.props.mail}</th>
        <th>
          <img 
            src={editar} 
            alt="ERROR"
            onClick={() => {this.props.cambiarModo(false, false, false, false, true), this.props.setIdPersona(this.props.id)}}
          />
          <img 
            src={eliminar} 
            alt="ERROR" 
            onClick={() => this.props.eliminarPersona(this.props.token, this.props.id)} 
            style={{marginLeft: '5px'}} 
          />         
        </th>
      </tr>
    )
  }
}
