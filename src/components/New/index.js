import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import firebase from '../../firebase';

import './new.css';

class New extends Component{
    constructor(props){
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            alert: '',
            progress: 0
        }
        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
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

        if(
            this.state.titulo !== '' && 
            this.state.imagem !== '' && 
            this.state.descricao !== '' &&
            this.state.imagem !== null &&
            this.state.url !== ''
        ){
            try{
                await firebase.newPost(localStorage.nome, this.state.descricao, this.state.url, this.state.titulo);
            }catch(error){
                alert(error.message);
                return null;
            }

            this.props.history.push('/dashboard');
        }else{
            this.setState({alert: 'Preencha todos os campos!'});
        }
    }

    handleFile = async(e) => {
        if(e.target.files[0]){

            const image = e.target.files[0];

            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({ imagem: image });
                this.handleUpload();
            }else{
                this.setState({alert: 'Envie uma imagem PNG ou JPEG!'});
                this.setState({image: null});
            }
        }
    }

    handleUpload = async () => {
        const {imagem} = this.state;
        const currentUid = firebase.getCurrentUid();
        const uploadTask = firebase.storage
        .ref(`images/${currentUid}/${imagem.name}`)
        .put(imagem);

        await uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

            this.setState({progress: progress});
        }, 
        (error) => {
            //Error
            console.log('Error Image: ' + error.message); 
        },
        () =>{
            //Success   
            firebase.storage.ref(`images/${currentUid}`)
            .child(imagem.name).getDownloadURL()
            .then( url => {
                this.setState({url: url});
            })
        });
    }

    render(){
        return(
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">

                    <span>{this.state.alert}</span>

                    <input type="file" onChange={this.handleFile} /><br/>

                    {this.state.url !== '' ?
                        <img src={this.state.url} width="250" height="150" alt="capa do post"/>
                    :
                        <progress value={this.state.progress} max="100"/>
                    }
                             
                    <label>Título</label><br/>
                    <input type="text" placeholder="Título de post" value={this.state.titulo} autoFocus
                            onChange={ (e) => this.setState({titulo: e.target.value})}/><br/>
                    
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