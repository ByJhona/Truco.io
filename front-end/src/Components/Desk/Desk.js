import React, {useState, useEffect} from 'react'
//import {getDeckBD} from '../../util/api-firebase'
import './Desk.scss'

import {database} from '../../util/firebase'

import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";

import CardDesk from '../CardDesk/CardDesk'
import {cartaMaisForte, verificaQuemGanha, distribuiCartas} from '../../Model/Regras'



export default function Docker({nickName, nameRoom}){

    const [card, setCard] = useState({suit: 'clubs', target: -1, value: ''})
    const [cardOponente, setCardOponente] = useState({value: 'hearts', suit: ' ', target: -1})

    useEffect(()=>{
        
        //const databaseRefPegaCard = ref(database, `rooms/${nameRoom}/desk`);
        onChildChanged(ref(database, `rooms/${nameRoom}/desk`), ((data) => {
            
            pegaCard();
        }))
        // Verifica quando todos os usuarios jogares
        onValue(ref(database, `rooms/${nameRoom}/desk/checkRound`),(data)=>{
            
            if(data.val() === 2){
                comparaCartas();
            }
        })

        onValue(ref(database, `rooms/${nameRoom}/desk/countRound`),(data)=>{
            const countRound = data.val();
            if(countRound === 3){
                verificaQuemGanha(nameRoom, database)
                distribuiCartas(nameRoom, database);
                update(ref(database, `rooms/${nameRoom}/desk/`), {countRound: 0})
            }


        })
        //Encerra a partida
        onValue(ref(database, `rooms/${nameRoom}/player1/`),(data)=>{
            const player = data.val();
            if(data.exists()){
                if(player.pontos === 2){
                    alert(`O jogador ${player.nickname} venceu o jogo`)
                }
    
            }

            
        })

        onValue(ref(database, `rooms/${nameRoom}/player2/`),(data)=>{
            const player = data.val();
            if(data.exists()){
                if(player.pontos === 2){
                    alert(`O jogador ${player.nickname} venceu o jogo`)
                }
    
            }
            
        })





    }, [])

    // inicio da funcao compara cartas
    function comparaCartas(){
        
        get(ref(database, `/rooms/${nameRoom}`)).then((data)=>{
            const sala = data.val()

            const cardPlayer1 = sala.desk.cardPlayer1;
            const cardPlayer2 = sala.desk.cardPlayer2;

            const nickNamePlayer1 = sala.player1.nickname;
            const nickNamePlayer2 = sala.player2.nickname;

            var countRound = sala.desk.countRound;
            countRound += 1;
            update(ref(database, `rooms/${nameRoom}/desk/`), {countRound: countRound})

            const ganhadora = cartaMaisForte(cardPlayer1, cardPlayer2);


            if(countRound === 1){
                if(ganhadora.suit === cardPlayer1.suit && ganhadora.value === cardPlayer1.value && ganhadora.target === cardPlayer1.target){
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round1: nickNamePlayer1})
                    //tem erro de logica aqui....
                }else if(ganhadora.suit === cardPlayer2.suit && ganhadora.value === cardPlayer2.value && ganhadora.target === cardPlayer2.target){
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round1: nickNamePlayer2})
                }else{
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round1: 'empate'})
                }
            }else if(countRound === 2){
                if(ganhadora.suit === cardPlayer1.suit && ganhadora.value === cardPlayer1.value && ganhadora.target === cardPlayer1.target){
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round2: nickNamePlayer1})
                }else if(ganhadora.suit === cardPlayer2.suit && ganhadora.value === cardPlayer2.value && ganhadora.target === cardPlayer2.target){
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round2: nickNamePlayer2})
                }else{
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round2: 'empate'})
                }
            }else{
                if(ganhadora.suit === cardPlayer1.suit && ganhadora.value === cardPlayer1.value && ganhadora.target === cardPlayer1.target){
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round3: nickNamePlayer1})
                }else if(ganhadora.suit === cardPlayer2.suit && ganhadora.value === cardPlayer2.value && ganhadora.target === cardPlayer2.target){
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round3: nickNamePlayer2})
                }else{
                    update(ref(database, `rooms/${nameRoom}/desk/`), {round3: 'empate'})
                }
                //Recomeça a contar o round para uma nova partida
                update(ref(database, `rooms/${nameRoom}/desk/`), {countRound: 0})
            }

            
            update(ref(database, `rooms/${nameRoom}/desk/`), {checkRound: 0})
            //update(ref(database, `rooms/${nameRoom}/desk/`), {countRound: countRound})
        
        
        })
        

    }
    // termino da funcao compara cartas
    //inicio pegadeck

    function pegaCard(){
        
        get(ref(database, `/rooms/${nameRoom}`)).then((data)=>{
            const sala = data.val()

            const cardPlayer1 = sala.desk.cardPlayer1;
            const cardPlayer2 = sala.desk.cardPlayer2;

            const nickNamePlayer1 = sala.player1.nickname;
            const nickNamePlayer2 = sala.player2.nickname;

            if(nickName === nickNamePlayer1){
                setCard(cardPlayer1);
                setCardOponente(cardPlayer2);
            }else{
                setCard(cardPlayer2);
                setCardOponente(cardPlayer1);
            }

        
        
        })

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