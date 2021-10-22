import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import skolzera from '../../Assents/skolzera.png'

import {setDeckBD, setDeck, setRoom} from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";
import {database} from '../../util/firebase'




import'./Game.scss'
import Docker from '../../Components/Docker/Docker'

//Import dos models



function Game(props){
    const nameRoom = props.location.nameRoom;
    const nickName = props.location.nickName;
    console.log(nickName)

    const [turn, setTurn] = useState(false)


    useEffect(()=> {
        const databaseRef = ref(database, `rooms/${nameRoom}/desk/turn`)

        onValue(databaseRef,()=>{
            defineTurn();
            console.log("Trocou de jogador")
        })




    })

    
    function defineTurn() {
        const databaseRef = ref(database, `rooms/${nameRoom}/desk/turn`)
        //
        get(databaseRef).then((snapshot) => {
            
            const name = snapshot.val()
            console.log(name)
            console.log(nickName)
            //const nomeREAL = name['nickname']
            //Veriffica qual jogador vai jogar 
            if (name == nickName) {
                //
                console.log("É sua vez de jogador")
                setTurn(true)
                //
                
            } else {
                //
                console.log("não é sua vez")
                setTurn(false)
              //

            }})
            //
        
    }


    
    return(
      
        <div className="container_body">
            
            <div className="main-Game">
                
                

                
                <div className={turn ? "divAtiva" : "divDesativa"}>
                    <p className={turn ? "pAtiva" : "pDesativa"}>É sua vez</p>
                    <Docker nameRoom={nameRoom} nickName={nickName} />
                </div>
                <img src={skolzera} alt="fundo" className="skolzera"/>

                
                
                
            </div>

        </div>
    )
}

export default Game;