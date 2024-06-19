import { Component } from 'react'

export default class InicioSesion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      contraseña: ""
    }
  }

  render() {
    return (
      <div className='Cuadro' style={{height: "230px"}}>
        <h2>INICIAR SESIÓN</h2>

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

        <div style={{flexDirection: 'row'}}>
          ¿No tienes una cuenta? 
          <span 
            className='Link' 
            onClick={() => this.props.cambiarModo(false)}
          >Registrar Usuario</span>
        </div>

        <button
          className='Boton'
          onClick={() => this.props.iniciarSesion(this.state.username, this.state.contraseña)}
        >Iniciar Sesión</button>
      </div>
    )
  }
}
