import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import skolzera from '../../Assents/skolzera.png'

import { setDeckBD, setDeck, setRoom } from '../../util/api-firebase'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildRemoved } from "firebase/database";
import { database } from '../../util/firebase'

import { distribuiCartas, pedirTruco } from '../../Model/Regras'

import trucobtn from '../../Assents/trucobtn.png'
import playbtn from '../../Assents/playbtn.png'

import './Game.scss'
import Docker from '../../Components/Docker/Docker'
import Desk from '../../Components/Desk/Desk'



//Import dos models



function Game(props) {
    const nameRoom = props.location.nameRoom;
    const nickName = props.location.nickName;
    //variavel para mostrar o botao de comecar partida
    const [bot, setBot] = useState(props.location.bot)
    //define se é a vez do robozinho
    const [turnBot, setTurnBot] = useState(false)
    // constante para indicar o tipo de jogo bot/jogador real
    const statusBot = props.location.bot;

    var v = [0, 1, 2]

    //console.log(nickName)

    const [turn, setTurn] = useState(false)


    useEffect(() => {
        const databaseRef = ref(database, `rooms/${nameRoom}/desk/turn`)

        onValue(databaseRef, (data) => {
            defineTurn();



        })








    }, [])


    function defineTurn() {
        const databaseRef = ref(database, `rooms/${nameRoom}/desk/turn`)
        //
        get(databaseRef).then((snapshot) => {

            const name = snapshot.val()

            //const nomeREAL = name['nickname']
            //Veriffica qual jogador vai jogar 
            if (name === nickName && name !== "BOT") {
                //

                setTurn(true)


                //

            } else if (name === "BOT") {
                jogaCartaBot();

            } else {
                //

                setTurn(false)



                //

            }
        })
        //

    }



    //Back-end para com o Bot////////////////////////////////

    function comecarPartida() {


        const player2 = { nickname: "BOT", pontos: 0 }
        update(ref(database, `rooms/${nameRoom}`), { player2 });
        distribuiCartas(nameRoom, database);
        setBot(false)
        setTurnBot(false)
    }

    function jogaCartaBot() {
        var carta = {}


        setTimeout(() => {
            console.log(v, "<<<<<<<<<<<<<<")
            // comeco do get
            get(ref(database, `rooms/${nameRoom}/player2/deck/${v[0]}`)).then((data) => {

                if (data.exists()) {
                    carta = data.val();
                    //joga a carta na mesa
                    update(ref(database, `rooms/${nameRoom}/desk/cardPlayer2`), { suit: carta.suit, value: carta.value, target: carta.target });
                    //Remove do deck do bot
                    update(ref(database, `rooms/${nameRoom}/player2/deck/${v[0]}`), { suit: "0", value: ' ', target: -1 });
                    v.shift()

                    if (v.length === 0) v = [0, 1, 2]
                    //atualiza para checagem das cartas -- Encontrada no arquivo de cartas refatorar
                    get(child(ref(database), `rooms/${nameRoom}/player1/`)).then((snapshot) => {
                        const name = snapshot.val()
                        const nomeBD = name['nickname']

                        update(ref(database, `rooms/${nameRoom}/desk`), { turn: nomeBD })
                    })

                    //
                    //refatorarrr -- usada em Carta funcao checkRound
                    get(ref(database, `rooms/${nameRoom}/desk/checkRound`)).then((snapshot) => {
                        var count = snapshot.val() + 1;

                        update(ref(database, `rooms/${nameRoom}/desk/`), { checkRound: count });

                    })



                } else {
                    console.log("Impossivel pegar carta do bot para jogar")
                }
            })
            //Fim do get
            //tira um elemento do vetor
        }, 2000)

    }


    /////////////////////////////////////////////////////////



    return (

        <div className="container_body">

            <div className="main-Game">


                <div className="desk">


                    <Desk nameRoom={nameRoom} nickName={nickName} />
                </div>
                <div className={turn ? "divAtiva" : "divDesativa"}>
                    <p className={turn ? "pAtiva" : "pDesativa"}>É sua vez</p>
                    <Docker nameRoom={nameRoom} nickName={nickName} />
                </div>

                <button onClick={() => comecarPartida()} className={bot ? "botAtivo" : "botDesativo"}>
                    <img src={playbtn} alt="playbtn" className="trucobtn" />
                </button>
                <img src={skolzera} alt="fundo" className="skolzera" />

                <button className="trucobtn">
                    <img src={trucobtn} alt="truco" className="trucobtn" />
                </button>


            </div>

        </div>
    )
}

export default Game;