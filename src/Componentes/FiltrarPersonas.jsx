import React, { Component } from 'react'

export default class FiltrarPersonas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dni: "",
      nombre: "",
      apellido: ""
    }
  }

  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>

        <h4>
          DNI: <input 
                  type="number" 
                  value={this.state.dni} 
                  onChange={(e) => this.setState({dni:e.target.value})}
                />
        </h4>
        <h4 style={{marginLeft: '10px'}}>
          Nombre: <input 
                    type="text" 
                    value={this.state.nombre} 
                    onChange={(e) => this.setState({nombre:e.target.value})}
                  />
        </h4>
        <h4 style={{marginLeft: '10px'}}>
          Apellido: <input 
                      type="text" 
                      value={this.state.apellido} 
                      onChange={(e) => this.setState({apellido:e.target.value})}
                    />
        </h4>

        <button 
          className='Boton' 
          style={{backgroundColor: 'gray', marginLeft: '5px'}}
          onClick={() => this.props.extraerPersonas(this.props.token, this.state.dni, this.state.nombre, this.state.apellido)}
        >Extraer Persona/s</button>

      </div>
    )
  }
}
