import React, { Component } from 'react'

export default class Usuarios extends Component {
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
      </tr>
    )
  }
}
