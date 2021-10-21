import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import skolzera from '../../Assents/skolzera.png'

import {getRooms, setRoom, contaMaisUmUsuario} from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildAdded } from "firebase/database";
import {database} from '../../util/firebase'

import { BrowserRouter, Switch, Route, Link, Redirect, useLocation  } from 'react-router-dom'
import CardSalas from '../../Components/CardSalas/CardSalas'

//Import de model
import Deck from '../../Model/Deck.model'
import Room from '../../Model/Room.model'





import'./Salas.scss'

//Import dos models


function Salas(props){
    //const location = useLocation()
    const [salas, setSalas] = useState([]);
    

    const [countUsers, setCountUsers] = useState(0)
    //const [result, setResult] = useState([])
    const desk = {teste:"oi"}
    const player1 = {nickname: props.location.nickname, pontos: 0}
    

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
    var room = new Room(criarNomeSala(), desk, cards, player1)



    useEffect(()=>{
        const databaseRef = ref(database, `rooms/${room.getRoom()}/count`)
        const databaseRefRoot = ref(database)
    
    get(child(databaseRefRoot, 'rooms/')).then((snapshot) =>{
        if (snapshot.exists()) {
            //array = [...array, snapshot.val()]
            //console.log(array)
            //console.log(snapshot.val())
            setSalas(snapshot.val())
            //setResult(Object.entries(salas))
            
            
        } else {
          alert("Erro desconhecido, nada encontrado na base de dados, lascou")
            
          //setSalas([])
        }
      }).catch((error) => {
        console.error(error);
      })

      



      onValue(databaseRef, (data)=> {
          console.log(data.val())
         setCountUsers(data.val())
      })

    }, [])

    var result = (Object.entries(salas))
    result.map( (index)=>{
    console.log(index[0]); 
});


    function createRoom(){
    //setando a sala no firebase
    console.log(room.getDesk())
    setRoom(room.getRoom(), room.getDesk(), room.getDeck(), room.getPlayer1(), 1);


    
    }

    function criarNomeSala(){
        const min = 111;
        const max = 999;
        return ("Sala@" +(Math.floor(Math.random() * (max - min + 1)) + min).toString())
    }

    

    return(
      
        <div className="container_body">
            
            <div className="main-Game">
               {/*<Link to={`/game/${room.getRoom()}`} onClick={createRoom()}>Criar uma nova sala</Link>*/}
                {/*<a href={`/game/${room.getRoom()}`} key={room.getRoom()} onClick={createRoom}>Criar uma nova salaaaaaaaaaaa</a>*/}
                <Link to={{
                    pathname: `/game/${room.getRoom()}`,
                    nickName: player1.nickname,
                    nameRoom: room.getRoom()}} key={room.getRoom()} onClick={createRoom}>Criar uma nova salaaa</Link>
                
            
                {result.map( (data, index)=>{
                    return <CardSalas data={data} player2={player1}/>
                    //return <Link to={`/game/${index[0]}`} key={index} onClick={iniciarPartida}>{index[0]}</Link>
                })
                }
                 
            
                
                
                
            </div>

        </div>
    )
}

export default Salas;