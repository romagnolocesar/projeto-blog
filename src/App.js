import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import firebase from './firebase';


import Header from './components/Header';

/* Pages */
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';


import './global.css';


class App extends Component {

  state = {
    firebaseInitialized: false
  };

  componentDidMount(){
    firebase.isInitialized().then(resultado => {
      
      this.setState({firebaseInitialized: resultado});
      //devolve o usuário
      console.log(this.state.isInitialized);
    })
  }

  render(){
    return this.state.firebaseInitialized !== false 
    ? (
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/dashboard" component={Dashboard}/>
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>Carregando...</h1>
  )};
}

export default App;
