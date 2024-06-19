import { Component } from 'react'

export default class Registrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      contraseña: "",
      nombre: "",
      apellido: "",
      dni: ""
    }
  }

  render() {
    return (
      <div className='Cuadro'>
        <h2>REGISTRAR USUARIO</h2>

        <input 
          type="text" 
          className='Dato' 
          placeholder='Nombre de usuario'
          onChange={(e) => this.setState({username:e.target.value})} 
          required 
        />
        <input 
          type="password" 
          className='Dato' 
          placeholder='Contraseña'
          onChange={(e) => this.setState({contraseña:e.target.value})} 
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
          type="text" 
          className='Dato' 
          placeholder='D.N.I'
          onChange={(e) => this.setState({dni:e.target.value})} 
          required 
        />

        <div style={{flexDirection: 'row'}}>
          ¿Ya tienes una cuenta? 
          <span 
            className='Link' 
            onClick={() => this.props.cambiarModo(true)}
          >Iniciar Sesión</span>
        </div>

        <button
          className='Boton'
          onClick={() => this.props.registrarUsuario(this.state.username, this.state.contraseña, this.state.nombre, this.state.apellido, this.state.dni)}
        >Registrarse</button>
      </div>
    )
  }
}
