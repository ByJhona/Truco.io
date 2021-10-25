import React, {useContext, useEffect, useState} from 'react'


import {getRooms, setRoom, contaMaisUmUsuario} from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildAdded } from "firebase/database";
import {database} from '../../util/firebase'

import { BrowserRouter, Switch, Route, Link, Redirect, useLocation  } from 'react-router-dom'
import CardSalas from '../../Components/CardSalas/CardSalas'

//Import de model
import Deck from '../../Model/Deck.model'
import Room from '../../Model/Room.model'

import {distribuiCartas} from '../../Model/Regras'






import'./Salas.scss'

//Import dos models


function Salas(props){
    //const location = useLocation()
    const [salas, setSalas] = useState([]);
    const [teste, setTeste] = useState([])
    
    

    const [countUsers, setCountUsers] = useState(0)
    //const [result, setResult] = useState([])
    const desk = {turn: props.location.nickname, 
        cardPlayer1: {suit:"", value: "", target: -1}, 
        cardPlayer2: {suit:"", value: "", target: -1}, 
        countRound: 0,
        checkRound: 0,
        round1: "",
        round2: "",
        round3: "",
        scoreRound: 1,
        truco: {
            //teste: false
            whoAsk: '',
            whoAccepted: '',
            trucoStatus: false
        }
    }
    const player1 = {nickname: props.location.nickname, pontos: 0}
    

    

    

    //Criando a sala
    var room = new Room(criarNomeSala(), desk, player1)

    // 
    



    useEffect(()=>{
        const databaseRef = ref(database, `rooms/${room.getRoom()}/countUsers`)
        const databaseRefRoot = ref(database)
    
    get(child(databaseRefRoot, 'rooms/')).then((snapshot) =>{
        if (snapshot.exists()) {
            //array = [...array, snapshot.val()]
            //console.log(array)
            console.log(snapshot.val())
            setSalas(snapshot.val())
            
            //setResult(Object.entries(salas))
            
            
        } else {
          console.log("Erro desconhecido, nada encontrado na base de dados, lascou")
            
          //setSalas([])
        }
      }).catch((error) => {
        console.error(error);
      })

      



      onValue(databaseRef, (data)=> {
          
         setCountUsers(data.val())
      })

    }, [])

    var result = (Object.entries(salas))
    var temp = result.filter((data)=>{
        if(data[1].countUsers == 1){
            return data[0]
        }

    })


    function createRoom(){
    //setando a sala no firebase
        
        setRoom(room.getRoom(), room.getDesk(), room.getPlayer1(), 1);

    }

    function criarNomeSala(){
        const min = 111;
        const max = 999;
        return ("Sala@" +(Math.floor(Math.random() * (max - min + 1)) + min).toString())
    }

    function jogarContraBot(){
        setRoom(room.getRoom(), room.getDesk(), room.getPlayer1(), 1);

        

    }

    

    return(
      
        <div className="container_body">
            
            <div className="main-Game">

                <div className="container-botoes">
                    <Link to={{
                    pathname: `/game/${room.getRoom()}`,
                    nickName: player1.nickname,
                    nameRoom: room.getRoom(), bot: false
                    }} key="47857" onClick={() => createRoom()}
                    className="criar-sala"
                    >Criar uma nova sala</Link>

                    <Link to={{
                    pathname: `/game/${room.getRoom()}`,
                    nickName: player1.nickname,
                    nameRoom: room.getRoom(), bot: true}}
                    className="jogar-bot"
                     key="54658" onClick={()=> jogarContraBot()}>Jogar contra o BoTruco
                    </Link>
                </div>

                    
                <p className="salas-disponiveis">Salas disponíveis</p>
            
                {temp.map( (data, index)=>{
                    return <CardSalas data={data} playerAUX={player1} key={index}/>
                    //return <Link to={`/game/${index[0]}`} key={index} onClick={iniciarPartida}>{index[0]}</Link>
                })
                }
 

                


                 
            
                
                
                
            </div>

        </div>
    )
}

export default Salas;