import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import skolzera from '../../Assents/skolzera.png'

import {getRooms, setRoom, contaMaisUmUsuario} from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged } from "firebase/database";
import {database} from '../../util/firebase'

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

//Import de model
import Deck from '../../Model/Deck.model'
import Room from '../../Model/Room.model'





import'./Salas.scss'

//Import dos models


function Salas(){
    const [salas, setSalas] = useState([]);
    var array = []
    var novoarray = array.map((data)=>{
        <h1>{data}</h1>
    })

    const [countUsers, setCountUsers] = useState(0)



    useEffect(()=>{
        const databaseRef = ref(database, `rooms/SALA03/count`)
        const databaseRefRoot = ref(database)
    
    get(child(databaseRefRoot, 'rooms/')).then((snapshot) =>{
        if (snapshot.exists()) {
            array = [...array, snapshot.val()]
            console.log(array)
            console.log(snapshot.val())
            setSalas(snapshot.val())
            
            
        } else {
          alert("Erro desconhecido, nada encontrado na base de dados, lascou")
            
          setSalas([])
        }
      }).catch((error) => {
        console.error(error);
      })



      onValue(databaseRef, (data)=> {
          console.log(data.val())
         setCountUsers(data.val())
      })

    }, [])

    let result = Object.entries(salas);
    result.map( (index)=>{
    console.log(index[0]); 
});


    function createRoom(){
        const desk = {teste:"oi"}
        const player = {player1:{
            nickname: "Felipe"
            }
        }


    //Setando o deck de cartas do jogo
    let suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    let values = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

    var deck = new Deck();
    deck.createDeck(suits, values)
    deck.shuffle()
    const cards = deck.getDeck()
    //Insere o deck direto no banco de dado
    //setDeck(deck.getDeck())

    //Criando a sala
    var room = new Room("SALA03", desk, cards, player)
    //setando a sala no firebase
    console.log(room.getDesk())
    setRoom(room.getRoom(), room.getDesk(), room.getDeck(), room.getPlayer(), 1);

    
    }

    function loob(){
        if(countUsers == 1){
            //setCountUsers(0)
            return <p>Aguardando...</p>
        }else if(countUsers == 2){
            //setCountUsers(0)
            return <p>Iniciando partida...</p>
        }else{
            return <p>{countUsers}</p>
        }
    }

    function iniciarPartida(){
        contaMaisUmUsuario();

    }

    

    return(
      
        <div className="container_body">
            
            <div className="main-Game">
                <button onClick={createRoom}>Criar uma nova sala</button>
                
            
                {result.map( (index)=>{
                    return <Link to={`/game/${index[0]}`} key={index.id} onClick={iniciarPartida}>{index[0]}</Link>
                })
                }
                {loob()}
            
                
                
                
            </div>

        </div>
    )
}

export default Salas;