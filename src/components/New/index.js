import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import './new.css';

class New extends Component{
    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            descricao: ''
        }
        this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar(e){
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
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