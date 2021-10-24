import React, {useState} from 'react'

//

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
import joker from '../../Assents/Cards/black_joker.svg'

//


import './CardDesk.scss'
import { ref, set, get, child, onValue, update, remove } from "firebase/database";
import {database} from '../../util/firebase'




export default function Carta({nickName, nameRoom, value, suit}){
    

    function qualCarta(){
        if(`${value}_of_${suit}` === "2_of_clubs"){
            return <img src={two_of_clubs} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "2_of_diamonds"){
             return <img src={two_of_diamonds} className="carta" />
         
         }else if(`${value}_of_${suit}` === "2_of_hearts"){
             return <img src={two_of_hearts} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "2_of_spades"){
             return <img src={two_of_spades} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "3_of_clubs"){
             return <img src={three_of_clubs} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "3_of_diamonds"){
              return <img src={three_of_diamonds} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "3_of_hearts"){
              return <img src={three_of_hearts} className="carta" />
         
         }else if(`${value}_of_${suit}` === "3_of_spades"){
              return <img src={three_of_spades} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "jack_of_clubs"){
             return <img src={jack_of_clubs} className="carta" />
         
         }else if(`${value}_of_${suit}` === "jack_of_diamonds"){
              return <img src={jack_of_diamonds} className="carta" />
         
         }else if(`${value}_of_${suit}` === "jack_of_hearts"){
              return <img src={jack_of_hearts} className="carta" />
         
         }else if(`${value}_of_${suit}` === "jack_of_spades"){
              return <img src={jack_of_spades} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "queen_of_clubs"){
             return <img src={queen_of_clubs} className="carta" />
         
         }else if(`${value}_of_${suit}` === "queen_of_diamonds"){
              return <img src={queen_of_diamonds} className="carta" />
         
         }else if(`${value}_of_${suit}` === "queen_of_hearts"){
              return <img src={queen_of_hearts} className="carta" />
         
         }else if(`${value}_of_${suit}` === "queen_of_spades"){
              return <img src={queen_of_spades} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "king_of_clubs"){
             return <img src={king_of_clubs} className="carta" />
         
         }else if(`${value}_of_${suit}` === "king_of_diamonds"){
              return <img src={king_of_diamonds} className="carta" />
         
         }else if(`${value}_of_${suit}` === "king_of_hearts"){
              return <img src={king_of_hearts} className="carta" />
         
         }else if(`${value}_of_${suit}` === "king_of_spades"){
              return <img src={king_of_spades} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "ace_of_clubs"){
             return <img src={ace_of_clubs} className="carta" />
         
         }else if(`${value}_of_${suit}` === "ace_of_diamonds"){
              return <img src={ace_of_diamonds} className="carta" />
         
         }else if(`${value}_of_${suit}` === "ace_of_hearts"){
              return <img src={ace_of_hearts} className="carta" />
         
         }else if(`${value}_of_${suit}` === "ace_of_spades"){
              return <img src={ace_of_spades} className="carta"/>
         
         }else if(`${value}_of_${suit}` === "4_of_clubs"){
             return <img src={four_of_clubs} className="carta" />
         
         }else if(`${value}_of_${suit}` === "7_of_diamonds"){
              return <img src={seven_of_diamonds} className="carta" />
         
         }else if(`${value}_of_${suit}` === "7_of_hearts"){
              return <img src={seven_of_hearts} className="carta" />
         
         }else if(`${value}_of_${suit}` === "black_of_joker"){
              return <img src={joker} className="carta"/>
         
         }
    }


    
    return(

        <div >
            
            

            {qualCarta()}
            
            
        </div>
    )
}