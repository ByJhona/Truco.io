import {database} from './firebase'
import React, {useContext, useEffect, useState} from 'react'
import { ref, set, get, child, onValue, update, remove, onChildRemoved, onChildChanged } from "firebase/database";

import { Redirect, useHistory } from 'react-router-dom'



export const SignIn = async (nickname) => {
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


export const setDeckBD = ( obj ) => {

  const deck = {
    0: obj[0],
    1: obj[1],
    2: obj[2]
  }

    update(ref(database, 'users/Jhonatan/'), {deck});
      
};

//nao usada essa funcao debaixo

export const WatchRemoveCards = () => {
  const databaseRef = ref(database, 'users/Jhonatan/deck');
  //const [deck1, setDeck] = useState(deck)

        
            onChildRemoved(databaseRef, (() => {
                get(databaseRef).then((snapshot) => {
                    if (snapshot.exists()) {
                      return (snapshot.val())
                      console.log(snapshot.val())
                        
                    } else {
                        console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                        return []
            }})

            }))
}

export function setDeck(deck){
  update(ref(database, 'sala01/'), {deck});
}

export function setRoom(room, desk, cards, player1, count, match){
  update(ref(database, 'rooms/' + room), {desk, cards, player1, count, match});

}

export function getRooms(){
  const databaseRef = ref(database, 'users/rooms/');

        
            onChildChanged(databaseRef, (() => {
                get(databaseRef).then((snapshot) => {
                    if (snapshot.exists()) {
                      alert(snapshot.val())
                      return (snapshot.val())
                      
                        
                    } else {
                        console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                        return []
            }})

            }))
}


export function contaMaisUmUsuario(room){
  const databaseRef = ref(database, `rooms/${room}/count`);

  get(databaseRef).then((data)=>{
    var count = data.val() + 1;
    console.log(data.val())
    update(ref(database, `rooms/${room}/`), {count});

  })

  

}