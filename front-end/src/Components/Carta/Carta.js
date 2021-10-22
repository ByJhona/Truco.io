import React, {useState} from 'react'

import two_of_clubs from '../../Assents/Cards/2_of_clubs.svg'
import two_of_diamonds from '../../Assents/Cards/2_of_diamonds.svg'
import two_of_hearts from '../../Assents/Cards/2_of_hearts.svg'
import two_of_spades from '../../Assents/Cards/2_of_spades.svg'




import './Carta.scss'
import { ref, set, get, child, onValue, update, remove } from "firebase/database";
import {database} from '../../util/firebase'



export default function Carta({nickName, nameRoom, value, suit, id}){
    

    function qualCarta(){
        if(`${value}_of_${suit}` === "2_of_clubs"){
           return <img src={two_of_clubs} className="carta" onClick={() => removeCardDB()}/>
        }else if(`${value}_of_${suit}` === "2_of_diamonds"){
            return <img src={two_of_diamonds} className="carta" onClick={() => removeCardDB()}/>
        }else if(`${value}_of_${suit}` === "2_of_hearts"){
            return <img src={two_of_hearts} className="carta" onClick={() => removeCardDB()}/>
        }else if(`${value}_of_${suit}` === "2_of_spades"){
            return <img src={two_of_spades} className="carta"onClick={() => removeCardDB()}/>
        }
    }


    function removeCardDB(){
        alert(id)
        
        


        const databaseRoot = ref(database)

        get(child(databaseRoot, `rooms/${nameRoom}/player1/`)).then((snapshot) => {
            //console.log(snapshot.val())
            const name = snapshot.val()
            //console.log(name['nickname'])
            const nomeBD = name['nickname']
            //Veriffica qual deck vai exibir no docker com base no nome do usuario
            if (nomeBD == nickName) {
                //
                update(ref(database, `rooms/${nameRoom}/player1/deck/${id}`), {value: ' ', suit: '0'})
                changeTurn("player2")
                putDesk("cardPlayer1")
                //indefinido
                countCheckRound();
                
            } else {
                update(ref(database, `rooms/${nameRoom}/player2/deck/${id}`), {value: ' ', suit: '0'})
                changeTurn("player1")
                putDesk("cardPlayer2")
                countCheckRound();
                //update(ref(database, `rooms/${nameRoom}/desk`), {turn: nickName})
                
                
            }}).catch(()=>{console.log("Deu ruim, parceiro")})
    }

    function putDesk(cardPlayer){
        
        //Seta a carta removida do deck do jogador para a mesa
        update(ref(database, `rooms/${nameRoom}/desk/${cardPlayer}/`), {value: value, suit: suit})

    }

    function countCheckRound(){
        //const databaseRef = ref(database, `rooms/${nameRoom}/checkRound`);

        const databaseRef = ref(database, `rooms/${nameRoom}/checkRound`);

  get(databaseRef).then((data)=>{
    var count = data.val() + 1;
    console.log(data.val())
    update(ref(database, `rooms/${nameRoom}/`), {checkRound: count});

  })
    }

    function changeTurn(player) {
        const databaseRoot = ref(database)
        //
        get(child(databaseRoot, `rooms/${nameRoom}/${player}/`)).then((snapshot)=>{
            const name = snapshot.val()
            const nomeBD = name['nickname']
            alert(nomeBD)
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