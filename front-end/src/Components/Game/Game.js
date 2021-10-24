import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import skolzera from '../../Assents/skolzera.png'

import {setDeckBD, setDeck} from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";
import {database} from '../../util/firebase'




import'./Game.scss'
import Docker from '../Docker/Docker'
import Deck from '../deck'


function Game(){
    let suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    let values = ["J", "Q", "K", "A", 2, 3, 4, 6];
    const [localDeck, setLocalDeck] = useState([])

    var deck = new Deck();
    deck.createDeck(suits, values)
    deck.shuffle()

    setDeck(deck.getDeck())

    
    
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