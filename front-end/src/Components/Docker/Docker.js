import React, {useState} from 'react'
//import {getDeckBD} from '../../util/api-firebase'
import './Docker.scss'
import two_of_clubs from '../../Assents/Cards/2_of_clubs.svg'
import {database} from '../../util/firebase'
import { ref, set, get, child, onValue, update, remove } from "firebase/database";

import Carta from '../Carta/Carta'



export default function Docker(){

    const [deck, setDeck] = useState([])


     function getDeckBD() {
        const databaseRef = ref(database);
    
        get(child(databaseRef, 'users/Jhonatan/deck')).then((snapshot) => {
            if (snapshot.exists()) {
              setDeck(snapshot.val())
                
            } else {
              alert("Erro desconhecido, nada encontrado na base de dados, lascou")
                
setDeck([])   
         }
        })
    }
    //getDeckBD()
    return(
        <div className="container">
            {getDeckBD()}


            {deck.map((carta)=>{
                return (
                   
                    <Carta value={carta.value} suit={carta.suit}/>
                )
            })}
            

            
            <Carta suit="clubs" value="2"/>


            
            
        </div>
    )
}

/*<button onClick={() => {
                getDeckBD() 
                console.log(deck)
            }}>Clique aqui</button>*/