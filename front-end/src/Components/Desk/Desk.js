import React, {useState, useEffect} from 'react'
//import {getDeckBD} from '../../util/api-firebase'
import './Desk.scss'

import {database} from '../../util/firebase'

import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";

import CardDesk from '../CardDesk/CardDesk'
import {cartaMaisForte} from '../../Model/Regras'



export default function Docker({nickName, nameRoom}){

    const [card, setCard] = useState({value: ' ', suit: ' ', target: -1})
    const [cardOponente, setCardOponente] = useState({value: ' ', suit: ' ', target: -1})

    useEffect(()=>{
        
        
        //const databaseRefPegaCard = ref(database, `rooms/${nameRoom}/desk`);
        onChildChanged(ref(database, `rooms/${nameRoom}/desk`), ((data) => {
            
            pegaCard();
        }))
        // Verifica quando todos os usuarios jogares
        onValue(ref(database, `rooms/${nameRoom}/desk/checkRound`),(data)=>{
            console.log(card, cardOponente)
            if(data.val() == 2){
                alert("FIM DO ROUND DEFINIR GANHADOR")
                // atualiza o checkround para poder saber quando relizar o check dnv
                update(ref(database, `rooms/${nameRoom}/desk/`), {checkRound: 0})

                console.log(card, cardOponente)
                const ganhadora = cartaMaisForte(card, cardOponente)

                if(ganhadora.target === -1){
                    console.log(ganhadora)
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round1: 'empate'})
                }

            }
        })

    }, [])

    //inicio pegadeck

    function pegaCard(){
        
        const databaseRoot = ref(database)
        get(child(databaseRoot, `rooms/${nameRoom}/player1/`)).then((snapshot) => {
            
            const name = snapshot.val()
            
            const nomeREAL = name['nickname']
            //Veriffica qual deck vai exibir no docker com base no nome do usuario
            if (nomeREAL == nickName) {
                //
              get(child(databaseRoot, `rooms/${nameRoom}/desk/cardPlayer1`)).then((data)=>{
                if (data.exists()) {
                    console.log(data.val())
                    setCard(data.val())
                    
                } else {
                    console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                    setCard({value: ' ', suit: ' ', target: -1})   
                }
              })//

              //Pega os dados do oponente

              get(child(databaseRoot, `rooms/${nameRoom}/desk/cardPlayer2`)).then((data)=>{
                if (data.exists()) {
                    setCardOponente(data.val())
                    
                } else {
                    console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                    setCardOponente({value: ' ', suit: ' ', target: -1})   
                }
              })
              //
                
            } else {
                //
            get(child(databaseRoot, `rooms/${nameRoom}/desk/cardPlayer2`)).then((data)=>{
                if (data.exists()) {
                    setCard(data.val())
                    
                } else {
                    console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                    setCard({value: ' ', suit: ' ', target: -1})   
                }
            })//

            //Pega os dados do oponente

            get(child(databaseRoot, `rooms/${nameRoom}/desk/cardPlayer1`)).then((data)=>{
                if (data.exists()) {
                    setCardOponente(data.val())
                    
                } else {
                    console.log("Erro desconhecido, nada encontrado na base de dados, lascou")    
                    setCardOponente({value: ' ', suit: ' ', target: -1})   
                }
              })
              //

                
            }})

    }

    //fim pegadeck

    function fimRound(data){
        if(card.suit == "0"){
            return false
        }
        return true
    }

    return(
        <div className="container-desk">

            <div>
                <p>Sua carta</p>
                <CardDesk nameRoom={nameRoom} nickName={nickName} suit={card.suit} value={card.value}/>
            </div>

            <div>
                <p>Carta do oponente</p>
                <CardDesk nameRoom={nameRoom} nickName={nickName} suit={cardOponente.suit} value={cardOponente.value}/>
            </div>
            
            
            
        </div>
    )
}