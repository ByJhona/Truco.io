import React, {useState} from 'react'

import two_of_clubs from '../../Assents/Cards/2_of_clubs.svg'
import two_of_diamonds from '../../Assents/Cards/2_of_diamonds.svg'
import two_of_hearts from '../../Assents/Cards/2_of_hearts.svg'
import two_of_spades from '../../Assents/Cards/2_of_spades.svg'


import './Carta.scss'



export default function Carta(props){

    function qualCarta(){
        if(`${props.value}_of_${props.suit}` === "2_of_clubs"){
           return <img src={two_of_clubs} className="carta"/>
        }else if(`${props.value}_of_${props.suit}` === "2_of_diamonds"){
            return <img src={two_of_diamonds} className="carta"/>
        }else if(`${props.value}_of_${props.suit}` === "2_of_hearts"){
            return <img src={two_of_hearts} className="carta"/>
        }else if(`${props.value}_of_${props.suit}` === "2_of_diamonds"){
            return <img src={two_of_spades} className="carta"/>
        }
    }
    
    return(

        <div >
            
            {console.log(`${props.value}_of_${props.suit}`)}
            {console.log(props.suit)}

            {qualCarta()}
            
            
        </div>
    )
}