import {database} from './firebase'
import React, {useContext, useEffect, useState} from 'react'
import { ref, set, get, child, onValue, update, remove } from "firebase/database";

import { Link } from 'react-router-dom'



export const signIn = (nickname) => {
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

export const signInAnonymous = () => {

    const nickNameAnonymous = randomNickNames();
    const databaseRef = ref(database, 'users/' + nickNameAnonymous)
    
    onValue(databaseRef, (snapshot) => {
        if(snapshot.exists()){
            alert("Usuário existente3")
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

export const signUp = ( nickname, password) => {
        
    const databaseRef = ref(database, 'users/' + nickname)
    
    onValue(databaseRef, (snapshot) => {
        if(snapshot.exists()){
           alert("Usuário existente2")
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

export async function getOnlineUsers(){
    const databaseRefGet = ref(database)
    


    get(child(databaseRefGet, 'onlineUsers/amount')).then((snapshot) =>{
        if (snapshot.exists()) {
            return snapshot.val()
            
        } else {
          alert("Erro desconhecido, nada encontrado na base de dados, lascou")
            
            return -1
        }
      }).catch((error) => {
        console.error(error);
      });

    
}
