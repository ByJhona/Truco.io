import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import skolzera from '../../Assents/skolzera.png'

import {setDeckBD} from '../../util/api-firebase'


import'./Game.scss'
import Docker from '../Docker/Docker'
import Deck from '../deck'


function Game(){
    let suits = ['hearts', 'diamonds', 'spades', 'clubs'];
    let values = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

    var deck = new Deck();
    deck.createDeck(suits, values)
    deck.shuffle()

    var deckA = []
    var deckB = []
    //var deckC = []

    setDeck();
    
    //setDeckBD(deckA);

    function setDeck(){
        var j = 0;
        var i;
        for(i = 0; i<  3; i++){
            deckA.push(deck.getCard(i));
            j = i;
        }

        for(i = 0;  i < 3; i++){
            deckB.push(deck.getCard(j));
            j = i;
        }
    }


    
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