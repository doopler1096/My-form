import React from 'react'
import {valName, valCorreo, valEdad} from './validaciones'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Input, Form, Label, Button,FormGroup} from 'reactstrap'
import './App.css';

class InputText extends React.Component{
  constructor(props){
    super(props);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      value:'',
      error:false,
      mensajeError:'',
    }
  }
  actualizarState(e){
    const {name, value}= e.target;
    console.log(this.props.validacion(value));

    if(this.props.validacion(value)){
      this.setState({
        value,
        error:false,
        mensajeError:''
      })
      this.props.actualizarState({
        name,value,error:false
      })
    }else{
      this.setState({
        value,
        error:true,
        mensajeError:this.props.mensajeError
      })
      this.props.actualizarState({
        name,value,error:true
      })
    }
  }
  render(){
    return(
      <div className='componente-input'>
          <Label htmlFor={'id-'+this.props.name}>{this.props.label}</Label>
          <Input
          id={'id-'+this.props.name}
          type='text'
          name={this.props.name}
          placeholder={this.props.placeholder}
          className={this.state.error ? 'border-error':''}
          onChange={this.actualizarState}/>
          {
            this.state.error ? (
              <p className='componente-input-error'>{this.state.mensajeError}</p>
            ) :('')
          }
      </div>
    )
  }
}

class InputSelect extends React.Component{
  constructor(props){
    super(props);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {activo:''}
  }

  actualizarState(e){
    const {name,value}= e.target;
    this.setState({value});
    this.props.actualizarState({
      name, value, error:value === ''? true: false
    })
  }
  render(){
    return(
      <div className='componente-input'>
        <label htmlFor={'id-'+this.props.name}>{this.props.label}</label>
        <Input type='select'>
          id={'id-'+this.props.name}
          name={this.props.name}
          onChange={this.actualizarState}
          {
            this.props.opciones.map((opciones, index)=>(
              <option key={index} value={opciones.value}>{opciones.texto}</option>
            ))
          }
        </Input>
      </div>
    )
  }
}

class InputCheckbox extends React.Component{
  constructor(props){
    super(props);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {activo:false}
  }

  actualizarState(e){
    const {name,checked}= e.target;
    this.setState({activo:checked});
    this.props.actualizarState({
      name, value:checked, error:false
    })
  }

  render(){
    return(
      <div className='componente-input'>
        <Input
          id={'id-'+this.props.name}
          type='checkbox'
          name={this.props.name}
          checked={this.state.activo}
          onChange={this.actualizarState}/>
          <label htmlFor={'id-'+this.props.name}>{this.props.label}</label>
      </div>
    )
  }
}

class App extends React.Component{

  constructor(props){
    super(props);
    this.submit = this.submit.bind(this);
    this.actualizarState = this.actualizarState.bind(this);
    this.state ={
      nombre:{
        value:'',
        error: false
      },
      correo:{
        value:'',
        error: false
      },
      edad:{
        value:'',
        error: false
      },
      Masculino:{
        value:false,
        error: true
      },
      Femenino:{
        value:false,
        error: true
      },
      Otro:{
        value:false,
        error: true
      },
      opciones:{
        value:'',
        error:false
      }
    }
  }

  actualizarState(input){
    this.setState({
      ...this.state,
      [input.name]:{
        value:input.value,
        error:input.error
      }
    }, ()=>{console.log(this.state);})
    
  }

  submit(e){
    e.preventDefoult();
    console.log(this.state)
  }

  render(){
    return(
      <Form onSubmit={this.submit}>
        <h1>Formulario de Inscripción</h1>
        <p>Formulario de inscripción para las actividades deportivas que se llevan a cavo en el coliseo de combate</p>
        <InputText
        label='Nombre'
        name='nombre'
        placeholder='Nombre'
        validacion={valName}
        mensajeError='Solo debes usar letras en este campo'
        actualizarState={this.actualizarState}/>

        <InputText
        label='Correo'
        name='correo'
        placeholder='Correo'
        validacion={valCorreo}
        mensajeError='Correo no valido'
        actualizarState={this.actualizarState}/>

        <InputText
        label='Edad'
        name='edad'
        placeholder='Indique su edad'
        validacion={valEdad}
        mensajeError='Caracteres no validos'
        actualizarState={this.actualizarState}/>

        <p>Indicanos con qué genero te identificas</p>

        <InputCheckbox
        className='checkBox'
        label='Masculino'
        name='Masculino'
        actualizarState={this.actualizarState}/>

        <InputCheckbox
        className='checkBox'
        label='Femenino'
        name='Femenino'
        actualizarState={this.actualizarState}/>

        <InputCheckbox
        className='checkBox'
        label='Otro'
        name='otro'
        actualizarState={this.actualizarState}/>

        <InputText
        label='Barrio de residencia'
        name='Barrio'
        placeholder='Indique su barrio de residencia'
        validacion={valName}
        mensajeError='Ingresa el nómbre solo con letras'
        actualizarState={this.actualizarState}/>

        <InputSelect
        name='opciones'
        label='Deporte que te gustaría practicar'
        actualizarState={this.actualizarState}
        opciones={[
          {value:'', texto:'Selecciona una opcion...'},
          {value:'1', texto:'Hapkido'},
          {value:'2', texto:'Takewondo'},
          {value:'3', texto:'karate'},
          {value:'4', texto:'Judo'},
          {value:'5', texto:'Lucha grecorromana'},
          {value:'6', texto:'Kung fu'},
        ]}/>

        <Button color='primary' 
          disabled={this.state.nombre.error || 
            this.state.correo.error ||
            this.state.edad.error ||
            this.state.opciones.error}
          type='submit'
          className={this.state.nombre.error || this.state.correo.error || this.state.edad.error ||this.state.opciones.error ? "button-desable": "button"}>
          enviar
        </Button>    
      </Form>
    )
  }
}


export default App;
