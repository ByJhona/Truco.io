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

    console.log(nameRoom)
    console.log(nickName)


    
    return(
      
        <div className="container_body">
            
            <div className="main-Game">
                
                

                <img src={skolzera} alt="fundo" className="skolzera"/>
                <Docker nameRoom={nameRoom} nickName={nickName}/>

                
                
                
            </div>

        </div>
    )
}

export default Game;