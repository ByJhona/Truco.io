import React, {useState} from 'react'

import two_of_clubs from '../../Assents/Cards/2_of_clubs.svg'
import two_of_diamonds from '../../Assents/Cards/2_of_diamonds.svg'
import two_of_hearts from '../../Assents/Cards/2_of_hearts.svg'
import two_of_spades from '../../Assents/Cards/2_of_spades.svg'

import three_of_clubs from '../../Assents/Cards/3_of_clubs.svg'
import three_of_diamonds from '../../Assents/Cards/3_of_diamonds.svg'
import three_of_hearts from '../../Assents/Cards/3_of_hearts.svg'
import three_of_spades from '../../Assents/Cards/3_of_spades.svg'

import jack_of_clubs from '../../Assents/Cards/jack_of_clubs2.svg'
import jack_of_diamonds from '../../Assents/Cards/jack_of_diamonds2.svg'
import jack_of_hearts from '../../Assents/Cards/jack_of_hearts2.svg'
import jack_of_spades from '../../Assents/Cards/jack_of_spades2.svg'

import queen_of_clubs from '../../Assents/Cards/queen_of_clubs2.svg'
import queen_of_diamonds from '../../Assents/Cards/queen_of_diamonds2.svg'
import queen_of_hearts from '../../Assents/Cards/queen_of_hearts2.svg'
import queen_of_spades from '../../Assents/Cards/queen_of_spades2.svg'

import king_of_clubs from '../../Assents/Cards/king_of_clubs2.svg'
import king_of_diamonds from '../../Assents/Cards/king_of_diamonds2.svg'
import king_of_hearts from '../../Assents/Cards/king_of_hearts2.svg'
import king_of_spades from '../../Assents/Cards/king_of_spades2.svg'

import ace_of_clubs from '../../Assents/Cards/ace_of_clubs.svg'
import ace_of_diamonds from '../../Assents/Cards/ace_of_diamonds.svg'
import ace_of_hearts from '../../Assents/Cards/ace_of_hearts.svg'
import ace_of_spades from '../../Assents/Cards/ace_of_spades.svg'

import four_of_clubs from '../../Assents/Cards/4_of_clubs.svg'
import seven_of_diamonds from '../../Assents/Cards/7_of_diamonds.svg'
import seven_of_hearts from '../../Assents/Cards/7_of_hearts.svg'
import joker from '../../Assents/Cards/red_joker.svg'

import './Carta.scss'
import { ref, set, get, child, onValue, update, remove } from "firebase/database";
import {database} from '../../util/firebase'



export default function Carta({nickName, nameRoom, value, suit, target, id}){
    

    function qualCarta(){
        if(`${value}_of_${suit}` === "2_of_clubs"){
            return <img src={two_of_clubs} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "2_of_diamonds"){
             return <img src={two_of_diamonds} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "2_of_hearts"){
             return <img src={two_of_hearts} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "2_of_spades"){
             return <img src={two_of_spades} className="carta"onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "3_of_clubs"){
             return <img src={three_of_clubs} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "3_of_diamonds"){
              return <img src={three_of_diamonds} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "3_of_hearts"){
              return <img src={three_of_hearts} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "3_of_spades"){
              return <img src={three_of_spades} className="carta"onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "jack_of_clubs"){
             return <img src={jack_of_clubs} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "jack_of_diamonds"){
              return <img src={jack_of_diamonds} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "jack_of_hearts"){
              return <img src={jack_of_hearts} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "jack_of_spades"){
              return <img src={jack_of_spades} className="carta"onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "queen_of_clubs"){
             return <img src={queen_of_clubs} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "queen_of_diamonds"){
              return <img src={queen_of_diamonds} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "queen_of_hearts"){
              return <img src={queen_of_hearts} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "queen_of_spades"){
              return <img src={queen_of_spades} className="carta"onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "king_of_clubs"){
             return <img src={king_of_clubs} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "king_of_diamonds"){
              return <img src={king_of_diamonds} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "king_of_hearts"){
              return <img src={king_of_hearts} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "king_of_spades"){
              return <img src={king_of_spades} className="carta"onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "ace_of_clubs"){
             return <img src={ace_of_clubs} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "ace_of_diamonds"){
              return <img src={ace_of_diamonds} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "ace_of_hearts"){
              return <img src={ace_of_hearts} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "ace_of_spades"){
              return <img src={ace_of_spades} className="carta"onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "4_of_clubs"){
             return <img src={four_of_clubs} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "7_of_diamonds"){
              return <img src={seven_of_diamonds} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "7_of_hearts"){
              return <img src={seven_of_hearts} className="carta" onClick={() => removeCardDB()}/>
         
         }else if(`${value}_of_${suit}` === "black_of_joker"){
              return <img src={joker} className="carta"onClick={() => removeCardDB()}/>
         
         }
    }


    function removeCardDB(){
        const databaseRoot = ref(database)

        get(child(databaseRoot, `rooms/${nameRoom}/player1/`)).then((snapshot) => {
            //console.log(snapshot.val())
            const name = snapshot.val()
            //console.log(name['nickname'])
            const nomeBD = name['nickname']
            //Veriffica qual deck vai exibir no docker com base no nome do usuario
            if (nomeBD == nickName) {
                //
                update(ref(database, `rooms/${nameRoom}/player1/deck/${id}`), {value: '', suit: '0', target: -1})
                changeTurn("player2")
                putDesk("cardPlayer1")
                //indefinido
                countCheckRound();
                
            } else {
                update(ref(database, `rooms/${nameRoom}/player2/deck/${id}`), {value: ' ', suit: '0', target: -1})
                changeTurn("player1")
                putDesk("cardPlayer2")
                countCheckRound();
                //update(ref(database, `rooms/${nameRoom}/desk`), {turn: nickName})
                
                
            }}).catch(()=>{console.log("Deu ruim, parceiro")})
    }

    function putDesk(cardPlayer){
        
        //Seta a carta removida do deck do jogador para a mesa
        update(ref(database, `rooms/${nameRoom}/desk/${cardPlayer}/`), {value: value, suit: suit, target: target})

    }

    function countCheckRound(){
        //const databaseRef = ref(database, `rooms/${nameRoom}/checkRound`);

        const databaseRef = ref(database, `rooms/${nameRoom}/desk/checkRound`);

  get(databaseRef).then((data)=>{
    var count = data.val() + 1;
    
    update(ref(database, `rooms/${nameRoom}/desk/`), {checkRound: count});

  })
    }

    function changeTurn(player) {
        const databaseRoot = ref(database)
        //
        get(child(databaseRoot, `rooms/${nameRoom}/${player}/`)).then((snapshot)=>{
            const name = snapshot.val()
            const nomeBD = name['nickname']
            
            update(ref(database, `rooms/${nameRoom}/desk`), {turn: nomeBD})
        })
        //
    }

    
    
    return(

        <div >
            
            

            {qualCarta()}
            
            
        </div>
    )
}