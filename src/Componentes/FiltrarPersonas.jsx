import React, { Component } from 'react'

export default class FiltrarPersonas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: ""
    }
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <h4>
          DNI, Nombre o Apellido: <input 
                  type="text" 
                  value={this.state.dni} 
                  onChange={(e) => this.setState({dni:e.target.value})}
                />
        </h4>

        <button 
          className='Boton' 
          style={{backgroundColor: 'gray', marginLeft: '5px'}}
          onClick={() => this.props.extraerPersonas(this.props.token, this.state.dni)}
        >Filtrar Persona/s</button>
      </div>
    )
  }
}
