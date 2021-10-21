import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import { Redirect, Link ,useHistory } from 'react-router-dom'
import { ref, set, get, child, onValue, update, remove, onChildRemoved, onChildChanged } from "firebase/database";
import {database} from '../../util/firebase'



import logo from '../../Assents/logo2.png'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import InputAdornment from '@mui/material/InputAdornment';

//import AccountCircle from '@mui/icons-material/AccountCircle';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {SignIn, signInAnonymous, signUp, getOnlineUsers} from '../../util/api-firebase'



import {useForm} from "react-hook-form"

import './Login.scss'

function Login(){
    const {register, handleSubmit, formState:{errors}} = useForm()
    
    const [nickname, setNickname] = useState(' ')
    const [password, setPassword] = useState(' ')
    const online = 0
    let history = useHistory();

    

    
    function signIn(nickname) {
      const databaseRef = ref(database)
      
      
      get(child(databaseRef, 'users/' + nickname)).then((snapshot) => {
          if (snapshot.exists()) {
              //Chamar o jogo a partir daqui
            console.log(snapshot.val());
            console.log("Logado com sucesso")
            
  
            //addOnlineUsers()
            console.log(nickname)
          history.push({
            pathname: '/salas',
            nickname: nickname,
          })
          setNickname('')
          setPassword('')
             
            
  
          } else {
            alert("Usuário não encontrado no database");
            
          }
        }).catch((error) => {
          console.error(error);
        });
  
       
  };
    

    
    return(
      
        <div className="container-body">
            
            <div className="main">
                <div className="header">
                    <InfoOutlinedIcon/>
                    
                    
                    <h2>Há { online } pessoas online</h2>
                </div>

                <div className="body">
                <div>
                  <img src={logo} alt="logo" className="logo"/>
                  <h1>Truco.io</h1>
                </div>

                <form onSubmit={handleSubmit}>

                    <TextField id="outlined-basic" 
                        label="Nome do usuário" 
                        placeholder="Digite seu nickname"
                        variant="outlined" 
                        
                        onChange={(data) => setNickname(data.target.value)} 
                        style={{
                          backgroundColor: '#aa3333', color:"white", textDecoration: "none", border: "none", fontWeight: "900"
                            
                            
                        }}
                        InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircleOutlinedIcon 
                            //style={{color:"white"}}
                            />
                        </InputAdornment>
                    ),
                  }}/>

                <TextField className="input" id="outlined-basic" 
                    label="Senha" 
                    placeholder="Digite sua senha"
                    style={{
                      backgroundColor: '#aa3333', textDecoration: "none", border: "none", borderRadius: '0.5rem', fontWeight: "900"
                        
                        
                    }}
                    variant="outlined" 
                    onChange={(data) => setPassword(data.target.value)}
                    InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon/>
                      </InputAdornment>
                    ),
                  }}/>


                  
                <Button                    
                  style={{backgroundColor: '#ebeb00', color:"#131313", textDecoration: "none", width: '100%', border: '1px solid #8f3131', fontWeight: "900", marginBottom: '-2rem', height: '3rem'}}
                  variant="outlined"
                onClick={() => signIn(nickname)}>Entrar
                  
                </Button>
                
                <div className="fast-action">
                  <Button 
                    style={{backgroundColor: '#aa3333', color:"#131313", textDecoration: "none", border: '1px solid #8f3131', fontWeight: "900", width: '120px'}}
                    
                    variant="outlined"
                    onClick={()=> signInAnonymous()}>Jogar no modo anônimo</Button>

                  <Button variant="outlined" 
                    style={{backgroundColor: '#aa3333',border: '1px solid #8f3131', color:"#131313", textDecoration: "none", fontWeight: "900", width: '120px'}}
                  
                    onClick={()=> signUp(nickname, password)}
                    >Cadastrar novo usuário</Button>
                </div>
                </form>
                </div>

                <div className="footer">
                  
                </div>
                
            </div>

        </div>
    )
}

export default Login;