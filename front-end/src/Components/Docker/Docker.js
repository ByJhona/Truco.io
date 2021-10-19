import React, {useState, useEffect} from 'react'
//import {getDeckBD} from '../../util/api-firebase'
import './Docker.scss'
import two_of_clubs from '../../Assents/Cards/2_of_clubs.svg'
import {database} from '../../util/firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";

import Carta from '../Carta/Carta'



export default function Docker(){
    

    const [deck, setDeck] = useState([])



// Remover duplicidade de funcoes get
     useEffect(()=>{
        
            const databaseRef = ref(database, 'users/Jhonatan/deck');
        
            onChildRemoved(databaseRef, (() => {
                get(databaseRef).then((snapshot) => {
                    if (snapshot.exists()) {
                      setDeck(snapshot.val())
                      console.log(snapshot.val())
                        
                    } else {
                        console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                        setDeck([])   
            }})

            }))
        }
, [])

useEffect(()=> {
    const databaseRef = ref(database, );

    get(child(databaseRef, 'users/Jhonatan/deck')).then((snapshot) => {
        if (snapshot.exists()) {
          setDeck(snapshot.val())
          console.log(snapshot.val())
            
        } else {
            console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
            setDeck([])   
}})


},[])


    //getDeckBD()
    return(
        <div className="container-docker">
            

            {deck.map((carta, index)=>{
                return (
                   
                    <Carta value={carta.value} suit={carta.suit} id={index} key={index}/>
                )
            })}


            
            

            
            


            
            
        </div>
    )
}

/*<button onClick={() => {
                getDeckBD() 
                console.log(deck)
            }}>Clique aqui</button>*/