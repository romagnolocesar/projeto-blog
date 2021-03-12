import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import firebase from '../../firebase';

import './new.css';

class New extends Component{
    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            descricao: '',
            alert: ''
        }
        this.cadastrar = this.cadastrar.bind(this);
    }

    componentDidMount(){
        //verifica se o usuário está logado
        if(!firebase.getCurrent()){
            this.props.history.replace('/');
            return null;
        }
    }

    cadastrar = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== ''){
            try{
                await firebase.newPost(localStorage.nome, this.state.descricao, this.state.imagem, this.state.titulo);
            }catch(error){
                alert(error.message);
                return null;
            }

            this.props.history.push('/dashboard');
        }else{
            this.setState({alert: 'Preencha todos os campos!'});
        }
    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                <span>{this.state.alert}</span>
                    <label>Título</label><br/>
                    <input type="text" placeholder="Título de post" value={this.state.titulo} autoFocus
                            onChange={ (e) => this.setState({titulo: e.target.value})}/><br/>
                    <label>Url da capa</label><br/>
                    <input type="text" placeholder="http://www.site.com/imagem.png" value={this.state.imagem}
                            onChange={ (e) => this.setState({imagem: e.target.value})}/><br/>
                    <label>Descrição</label><br/>
                    <textarea type="text" placeholder="Texto do post" value={this.state.descricao}
                        onChange={(e) => this.setState({descricao: e.target.value})}></textarea><br/>

                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(New);