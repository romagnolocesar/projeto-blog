import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            nome: localStorage.nome,
            email: localStorage.email,
        }

        this.logout = this.logout.bind(this);

    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            let nomeUsuario = info.val().nome;
            let emailUsuario = info.val().email;
            localStorage.nome = nomeUsuario;
            localStorage.email = emailUsuario;
            this.setState({
                nome: localStorage.nome,
                email: localStorage.email
            });
        });
        
    }

    logout(){
        firebase.logOut((result) => {
            console.log(result);
        });
    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to='/dashboard/new'>Novo Post</Link>
                </div>
                <p>Logado com: {this.state.email}</p>
                <button onClick={() => this.logout()}>Deslogar</button>
            </div>
        );
    }
}

export default  withRouter(Dashboard);