import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import logo from '../../Assents/logo3.png'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import InputAdornment from '@mui/material/InputAdornment';

//import AccountCircle from '@mui/icons-material/AccountCircle';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {database} from '../../util/firebase'


import { ref, set, get, child, onValue, update, remove } from "firebase/database";



import {useForm} from "react-hook-form"

import './Login.scss'

function Login(){
    const {register, handleSubmit, formState:{errors}} = useForm()
    
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [online, setOnline] = useState(0)

    const signIn = () => {
        const databaseRef = ref(database)
        get(child(databaseRef, 'users/' + nickname)).then((snapshot) => {
            if (snapshot.exists()) {
                //Chamar o jogo a partir daqui
              console.log(snapshot.val());
              alert("Logado com sucesso")
              update(ref(database, 'users/' + nickname), {
                  status: true
              })

              addOnlineUsers()

            } else {
              alert("Usuário não encontrado no database");
            }
          }).catch((error) => {
            console.error(error);
          });
          
    };

    function randomNickNames(){

        const min = 111;
        const max = 999;
        return ("Truculento@" +(Math.floor(Math.random() * (max - min + 1)) + min).toString())
    }

    const signInAnonymous = () => {

        const nickNameAnonymous = randomNickNames();
        const databaseRef = ref(database, 'users/' + nickNameAnonymous)
        
        onValue(databaseRef, (snapshot) => {
            if(snapshot.exists()){
                alert("Usuário existente")
            }else{
                set(ref(database, 'users/' + nickNameAnonymous), {
                    nickname: nickNameAnonymous,
                    password: '',
                    status: true
                  });

                  addOnlineUsers()


            }
        })
          
    };

    const signUp = () => {
        
        const databaseRef = ref(database, 'users/' + nickname)
        
        onValue(databaseRef, (snapshot) => {
            if(snapshot.exists()){
               alert("Usuário existente")
            }else{
                set(ref(database, 'users/' + nickname), {
                    nickname: nickname,
                    password: password,
                    status: true
                  });

                  alert("Logado com sucesso")
                  addOnlineUsers()
                  
            }
        })

          
    };


    
    function addOnlineUsers(){
        const databaseRefGet = ref(database)
        var amount = 0;

        get(child(databaseRefGet, 'onlineUsers/amount')).then((snapshot) => {
            if (snapshot.exists()) {
                //Chamar o jogo a partir daqui
              console.log(snapshot.val());
              amount = snapshot.val()

              const soma = amount + 1; 
              

              update(ref(database, 'onlineUsers/'), {
                amount: soma
            })
            } else {
              alert("Erro desconhecido, lascou")
            }
          }).catch((error) => {
            console.error(error);
          });        
        
        
    }
    function removeOnlineUsers(){
      const databaseRefGet = ref(database)
      var amount = 0;

      get(child(databaseRefGet, 'onlineUsers/amount')).then((snapshot) => {
          if (snapshot.exists()) {
              //Chamar o jogo a partir daqui
            console.log(snapshot.val());
            amount = snapshot.val()

            const soma = amount - 1; 
            

            update(ref(database, 'onlineUsers/'), {
              amount: soma
          })
          } else {
            alert("Erro desconhecido, lascou")
          }
        }).catch((error) => {
          console.error(error);
        });        
      
      
  }


     (function getOnlineUsers(){
        const databaseRefGet = ref(database)
        


        get(child(databaseRefGet, 'onlineUsers/amount')).then((snapshot) => {
            if (snapshot.exists()) {
                
                setOnline(snapshot.val())
            } else {
              alert("Erro desconhecido, nada encontrado na base de dados, lascou")
                
                setOnline(-1)
            }
          }).catch((error) => {
            console.error(error);
          });

        
    })()

    
    

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

                <form onSubmit = { handleSubmit(signIn) }>

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
                  style={{backgroundColor: '#ebeb00', color:"#131313", textDecoration: "none", border: "none", fontWeight: "900", marginBottom: '-2rem', height: '3rem'}}
                  type="submit" variant="outlined">Entrar
                  
                </Button>
                <div className="fast-action">
                  <Button 
                    style={{backgroundColor: '#aa3333', color:"#131313", textDecoration: "none", border: '1px solid #8f3131', fontWeight: "900", width: '120px'}}
                    onClick={signInAnonymous}
                    variant="outlined">Jogar no modo anônimo</Button>

                  <Button variant="outlined" onClick={signUp}
                    style={{backgroundColor: '#aa3333',border: '1px solid #8f3131', color:"#131313", textDecoration: "none", fontWeight: "900", width: '120px'}}
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