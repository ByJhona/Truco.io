import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';

import {getRooms, setRoom, contaMaisUmUsuario} from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildAdded } from "firebase/database";
import {database} from '../../util/firebase'

import { BrowserRouter, Switch, Route, Link, Redirect, useLocation  } from 'react-router-dom'

import Deck from '../../Model/Deck.model'

import {distribuiCartas} from '../../Model/Regras'







function CardSalas({data, playerAUX}){

    const nameRoom = data[0]
    const player2 = {nickname: playerAUX.nickname, pontos: playerAUX.pontos}
    
    function iniciarPartida(roomname){
        contaMaisUmUsuario(roomname);

        update(ref(database, `rooms/${roomname}`), {player2});

        //update(ref(database, `rooms/${roomname}`), {player2});
        distribuiCartas(nameRoom, database);

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