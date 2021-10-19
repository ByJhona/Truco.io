import React, {useState} from 'react'

import two_of_clubs from '../../Assents/Cards/2_of_clubs.svg'
import two_of_diamonds from '../../Assents/Cards/2_of_diamonds.svg'
import two_of_hearts from '../../Assents/Cards/2_of_hearts.svg'
import two_of_spades from '../../Assents/Cards/2_of_spades.svg'




import './Carta.scss'
import { ref, set, get, child, onValue, update, remove } from "firebase/database";
import {database} from '../../util/firebase'



export default function Carta(props){

    function qualCarta(){
        if(`${props.value}_of_${props.suit}` === "2_of_clubs"){
           return <img src={two_of_clubs} className="carta" onClick={() => removeCardDB(props.id)}/>
        }else if(`${props.value}_of_${props.suit}` === "2_of_diamonds"){
            return <img src={two_of_diamonds} className="carta" onClick={() => removeCardDB(props.id)}/>
        }else if(`${props.value}_of_${props.suit}` === "2_of_hearts"){
            return <img src={two_of_hearts} className="carta" onClick={() => removeCardDB(props.id)}/>
        }else if(`${props.value}_of_${props.suit}` === "2_of_spades"){
            return <img src={two_of_spades} className="carta"onClick={() => removeCardDB(props.id)}/>
        }
    }


    function removeCardDB(id){
        remove(ref(database, `users/Jhonatan/deck/${id}`), null)
    }

    console.log(props.id)
    console.log(props.suit)
    
    return(

        <div >
            
            

            {qualCarta()}
            
            
        </div>
    )
}