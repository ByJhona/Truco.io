import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import skolzera from '../../Assents/skolzera.png'

import {setDeckBD, setDeck, setRoom} from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";
import {database} from '../../util/firebase'




import'./Game.scss'
import Docker from '../../Components/Docker/Docker'
import Deck from '../../Model/Deck.model'

//Import dos models
import Room from '../../Model/Room.model'


function Game(){

    const desk = {teste:"oi"}
    const players = {player1:{
        nickname: "Felipe"
    }, 
        player2:{
            nickname: "Joao"
        }
    ,}


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
    var room = new Room("SALA02", desk, cards, players)
    //setando a sala no firebase
    console.log(room.getDesk())
    setRoom(room.getRoom(), room.getDesk(), room.getDeck(), room.getPlayers());

    //Cria um nome aleatorio para sala
    
    

    
    return(
      
        <div className="container_body">
            
            <div className="main-Game">
                
                

                <img src={skolzera} alt="fundo" className="skolzera"/>
                <Docker/>

                
                
                
            </div>

        </div>
    )
}

export default Game;