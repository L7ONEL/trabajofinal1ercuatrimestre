import React, { Component } from 'react'

export default class Personas extends Component {
  render() {
    return (
      <tr>
        <th>{this.props.documento}</th>
        <th>{this.props.nombres}</th>
        <th>{this.props.apellidos}</th>
        <th>{this.props.fechaNac}</th>
        <th>{this.props.telefono}</th>
        <th>{this.props.domicilio}</th>
        <th>{this.props.mail}</th>
        <th>
          <img 
            src={this.props.editar} 
            alt="ERROR" 
            onClick={() => this.props.cambiarModo(false, false, false, false, true)} 
            style={{marginRight: '5px'}} 
          />
          <img 
            src={this.props.eliminar} 
            alt="ERROR" 
            onClick={() => this.props.eliminarPersona(this.props.token, this.props.key)} 
            style={{marginLeft: '5px'}} 
          />         
        </th>
      </tr>
    )
  }
}
