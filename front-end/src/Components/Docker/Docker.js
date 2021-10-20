import React, {useState, useEffect} from 'react'
//import {getDeckBD} from '../../util/api-firebase'
import './Docker.scss'
import two_of_clubs from '../../Assents/Cards/2_of_clubs.svg'
import {database} from '../../util/firebase'
import {WatchRemoveCards} from '../../util/api-firebase'

import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";

import Carta from '../Carta/Carta'



export default function Docker(){
    

    const [deck, setDeck] = useState([])
    


// Remover duplicidade de funcoes get
    useEffect(()=>{
        
        const databaseRef = ref(database, 'users/Jhonatan/deck');
        const databaseRoot = ref(database)
        onChildChanged(databaseRef, ((data) => {
            
            get(databaseRef).then((snapshot) => {
                console.log(snapshot.val())
                if (snapshot.exists()) {
                    setDeck(snapshot.val())
                    
                } else {
                    console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                    setDeck([])   
                }
            })
        }))


        get(child(databaseRoot, 'users/Jhonatan/deck')).then((snapshot) => {
            console.log(snapshot.val())
            if (snapshot.exists()) {
              setDeck(snapshot.val())
              
                
            } else {
                console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                setDeck([])   
            }}).catch(
        setDeck([]))

        

    }, [])

    function verifica(data){
        if(data.suit == "0"){
            return false
        }
        return true
    }

    

    //getDeckBD() 
    return(
        <div className="container-docker">
            
            {
                deck.map((data, index) => {
                   if(verifica(data)) return <Carta suit={data.suit} value={data.value} id={index}/>
                })

            }
            
            
        </div>
    )
}

/*<button onClick={() => {
                getDeckBD() 
                console.log(deck)
            }}>Clique aqui</button>*/