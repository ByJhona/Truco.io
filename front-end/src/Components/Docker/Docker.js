import React, {useState, useEffect} from 'react'
//import {getDeckBD} from '../../util/api-firebase'
import './Docker.scss'
import two_of_clubs from '../../Assents/Cards/2_of_clubs.svg'
import {database} from '../../util/firebase'
import {WatchRemoveCards} from '../../util/api-firebase'

import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";

import Carta from '../Carta/Carta'



export default function Docker({nickName, nameRoom}){

    const [deck, setDeck] = useState([])
    


// Remover duplicidade de funcoes get
    useEffect(()=>{
        
        const databaseRef = ref(database, `rooms/${nameRoom}`);
        const databaseRoot = ref(database)
        onChildChanged(databaseRef, ((data) => {
            
            pegaDeck();
        }))

    pegaDeck()
        

    }, [])

    function verifica(data){
        if(data.suit == "0"){
            return false
        }
        return true
    }

    function pegaDeck(){
        
        const databaseRoot = ref(database)
        get(child(databaseRoot, `rooms/${nameRoom}/player1/`)).then((snapshot) => {
            console.log(snapshot.val())
            const name = snapshot.val()
            console.log(name['nickname'])
            const nomeREAL = name['nickname']
            //Veriffica qual deck vai exibir no docker com base no nome do usuario
            if (nomeREAL == nickName) {
                //
              get(child(databaseRoot, `rooms/${nameRoom}/player1/deck`)).then((data)=>{
                if (data.exists()) {
                    setDeck(data.val())
                    
                } else {
                    console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                    setDeck([])   
                }
              })//
              
                
            } else {
                //
              get(child(databaseRoot, `rooms/${nameRoom}/player2/deck`)).then((data)=>{
                if (data.exists()) {
                    setDeck(data.val())
                    
                } else {
                    console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                    setDeck([])   
                }
              })//

                
            }}).catch(
        setDeck([]))

    }

    

    //getDeckBD() 
    return(
        <div className="container-docker">
            
            {
                deck.map((data, index) => {
                   if(verifica(data)) return <Carta nameRoom={nameRoom} nickName={nickName} suit={data.suit} value={data.value} id={index}/>
                })

            }
            
            
        </div>
    )
}