import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import skolzera from '../../Assents/skolzera.png'

import'./Game.scss'
import Docker from '../Docker/Docker'

function Game(){
    
    return(
      
        <div className="container_body">
            
            <div className="main-Game">
                <img src={skolzera} alt="fundo" className="skolzera"/>
                
                
            </div>

        </div>
    )
}

export default Game;