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
    const desk = {turn: props.location.nickname, 
        cardPlayer1: {suit:"", value: "", target: -1}, 
        cardPlayer2: {suit:"", value: "", target: -1}, 
        countRound: 0,
        checkRound: 0,
        round1: "",
        round2: "",
        round3: ""
    }
    const player1 = {nickname: props.location.nickname, pontos: 0}
    

    

    

    //Criando a sala
    var room = new Room(criarNomeSala(), desk, player1)



    useEffect(()=>{
        const databaseRef = ref(database, `rooms/${room.getRoom()}/countUsers`)
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
    
    setRoom(room.getRoom(), room.getDesk(), room.getPlayer1(), 1);


    
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
                    return <CardSalas data={data} playerAUX={player1}/>
                    //return <Link to={`/game/${index[0]}`} key={index} onClick={iniciarPartida}>{index[0]}</Link>
                })
                }
                 
            
                
                
                
            </div>

        </div>
    )
}

export default Salas;