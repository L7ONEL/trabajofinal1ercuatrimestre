import { Component } from 'react'

export default class EditarPersona extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            dni: "",
            nombre: "",
            apellido: "",
            fecNac: "",
            numCel: "",
            domicilio: "",
            mail: ""
        }
    }

    render() {
        return (
          <div className='Cuadro'>
            <h2>EDITAR DATOS DE PERSONA</h2>

            <input 
              type="number" 
              className='Dato' 
              placeholder='ID del usuario'
              onChange={(e) => this.setState({id:e.target.value})}
              required
            />
    
            <input 
              type="text" 
              className='Dato' 
              placeholder='D.N.I'
              onChange={(e) => this.setState({dni:e.target.value})}
              required
            />
    
            <input 
              type="text" 
              className='Dato' 
              placeholder='Nombre' 
              onChange={(e) => this.setState({nombre:e.target.value})}
              required
            />

            <input 
              type="text" 
              className='Dato' 
              placeholder='Apellido' 
              onChange={(e) => this.setState({apellido:e.target.value})}
              required
            />

            <input 
              type="date" 
              className='Dato'
              style={{width: '222.5px'}}
              placeholder='Fecha de nacimiento' 
              onChange={(e) => this.setState({fecNac:e.target.value})}
              required
            />

            <input 
              type="number" 
              className='Dato' 
              placeholder='Numero de celular'
              onChange={(e) => this.setState({numCel:e.target.value})}
              required
            />

            <input 
              type="text" 
              className='Dato' 
              placeholder='Domicilio'
              onChange={(e) => this.setState({domicilio:e.target.value})}
              required
            />

            <input 
              type="text" 
              className='Dato' 
              placeholder='E-mail'
              onChange={(e) => this.setState({mail:e.target.value})}
              required
            />
    
            <button
              className='Boton'
              onClick={() => this.props.accion(this.props.token, this.state.id, this.state.dni, this.state.nombre, this.state.apellido, this.state.fecNac, this.state.numCel, this.state.domicilio, this.state.mail)}
            >Cambiar datos</button>
          </div>
        )
      }
}
