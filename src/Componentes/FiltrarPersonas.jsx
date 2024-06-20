import React, { Component } from 'react'

export default class FiltrarPersonas extends Component {
  render() {
    return (
      <div style={{flexDirection: 'row'}}>
        DNI: <input type="text" value={this.props.dni} />
        Nombre: <input type="text" value={this.props.nombre} />
        Apellido: <input type="text" value={this.props.apellido} />
        <button className='Boton'>Extraer Persona/s</button>
      </div>
    )
  }
}
