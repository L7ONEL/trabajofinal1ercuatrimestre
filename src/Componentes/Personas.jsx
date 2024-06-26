import React, { Component } from 'react'

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
            src={this.props.eliminar} 
            alt="ERROR" 
            onClick={() => this.props.eliminarPersona(this.props.token, this.props.id)} 
            style={{marginLeft: '5px'}} 
          />         
        </th>
      </tr>
    )
  }
}
