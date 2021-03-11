import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import firebase from '../../firebase';

import './dashboard.css';

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
            localStorage.nome = nomeUsuario;
            this.setState({nome: localStorage.nome});
        });
        
        
    }

    logout = async () => {
        await firebase.logOut()
        .catch((error) => {
            console.log(error);
        })

        localStorage.removeItem("nome");
        this.props.history.push('/');
    }

    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}</h1>
                    <Link to='/dashboard/new'>Novo Post</Link>
                </div>
                <p>Logado com: {firebase.getCurrent()}</p>
                <button onClick={() => this.logout()}>Deslogar</button>
            </div>
        );
    }
}

export default  withRouter(Dashboard);