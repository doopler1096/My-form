import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Row, FormGrup, Div, Label, Input, Button} from 'reactstrap'
import './App.css';
import { Button } from 'bootstrap';

class InputText extends React.Component{
  constructor(props){
    this.actualizarState= this.actualizarState.bind(this)
    this.state= {
      value: '',
      error: false,
      mensajeError: ''
    }
  }
  actualizarState(e)

  render(){
    return(
      <Div>
        <Label htmlFor={'id-'+this.props.name}>{this.props.Label}</Label>
      </Div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.submit= this.submit.bind(this)
  }

}

export default App;
