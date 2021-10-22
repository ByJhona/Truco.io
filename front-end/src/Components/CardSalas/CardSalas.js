import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';

import {getRooms, setRoom, contaMaisUmUsuario} from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildAdded } from "firebase/database";
import {database} from '../../util/firebase'

import { BrowserRouter, Switch, Route, Link, Redirect, useLocation  } from 'react-router-dom'

import Deck from '../../Model/Deck.model'







function CardSalas({data, playerAUX}){

    const nameRoom = data[0]
    const player2 = {nickname: playerAUX.nickname, pontos: playerAUX.pontos}
    
    function iniciarPartida(roomname){
        contaMaisUmUsuario(roomname);

        update(ref(database, `rooms/${roomname}`), {player2});

        //update(ref(database, `rooms/${roomname}`), {player2});
        distribuiCartas();

    }
    function distribuiCartas(){
        let suits = ['hearts', 'diamonds', 'spades', 'clubs'];
        let values = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

        var deckAUX = new Deck();
        deckAUX.createDeck(suits, values)
        deckAUX.shuffle()

        //console.log(deckAUX)

        var deckA = []
        var deckB = []
        var i, j = 0;

        for(i = 0; i < 3; i++){
            deckA.push(deckAUX.getCard(j))
            j++;
        }
        //console.log(deckA)
        for(i = 0; i < 3; i++){
            deckB.push(deckAUX.getCard(j))
            j++;
        }
        var deck = deckA;
        update(ref(database, `/rooms/${nameRoom}/player1`), {deck});

        deck = deckB;
        update(ref(database, `/rooms/${nameRoom}/player2`), {deck});




        
    }




    return(
      
        <div className="cardSalas-container">
            <Link to={{
            pathname: `/game/${nameRoom}`,
            nameRoom: data[0],
            nickName: player2.nickname
          }} onClick={() => iniciarPartida(nameRoom)}>{nameRoom}</Link>
            
            

        </div>
    )
}

export default CardSalas;