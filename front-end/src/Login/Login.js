import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import logo from '../Assents/logo.svg'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import InputAdornment from '@mui/material/InputAdornment';

//import AccountCircle from '@mui/icons-material/AccountCircle';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {database} from '../util/firebase'


import {useAuth} from '../Context/AuthContext'
import { ref, set, get, child, onValue, update, remove } from "firebase/database";



import {useForm} from "react-hook-form"

import './Login.scss'

function Login(){
    const {register, handleSubmit, formState:{errors}} = useForm()
    
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [online, defineOnline] = useState(0)
    //const {signup} = useAuth()

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
                  setOnlineUsers(-1)
                  
            }
        })

          
    };


    
    function setOnlineUsers(number){
        const databaseRefGet = ref(database)
        var amount = 0;

        get(child(databaseRefGet, 'onlineUsers/amount')).then((snapshot) => {
            if (snapshot.exists()) {
                //Chamar o jogo a partir daqui
              console.log(snapshot.val());
              amount = snapshot.val()

              const soma = amount + number; 
              

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

    function getOnlineUsers(){
        const databaseRefGet = ref(database)
        var amount = 0;


        get(child(databaseRefGet, 'onlineUsers/amount')).then((snapshot) => {
            if (snapshot.exists()) {
                alert(snapshot.val())
                amount =  snapshot.val()
            } else {
              alert("Erro desconhecido, nada encontrado na base de dados, lascou")
                amount =  -1;
            }
          }).catch((error) => {
            console.error(error);
          });


        return amount
    }

    useEffect(()=>{
        defineOnline(getOnlineUsers())
    }, [])



    return(
        <div className="container-body">
            
            <div className="main">
                <div className="header">
                    <InfoOutlinedIcon/>
                    <h2>No momento há {online} pessoas online</h2>
                </div>

                <div className="body">

                <img src={logo} alt="logo"/>

                <form onSubmit = { handleSubmit(signIn) }>

                    <TextField id="outlined-basic" 
                        label="Nome do usuário" 
                        variant="outlined" 
                        onChange={(data) => setNickname(data.target.value)} 
                        InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircleOutlinedIcon/>
                        </InputAdornment>
                    ),
                  }}/>

                <TextField className="input" id="outlined-basic" 
                    label="Senha" 
                    style={{
                        borderColor: '#fff',
                        
                        
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
                <Button type="submit" variant="outlined">Entrar</Button>
                <div className="fast-action">
                  <Button 
                    onClick={signInAnonymous}
                    variant="outlined">Jogar no modo anônimo</Button>

                  <Button variant="outlined" onClick={signUp}>Cadastrar novo usuário</Button>
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