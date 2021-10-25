
import Deck from '../Model/Deck.model'
import { ref, set, get, child, onValue, update, remove, onChildChanged, onChildAdded } from "firebase/database";



export function cartaMaisForte(card1, card2) {
    if(card1.target > card2.target){
        return card1
    }else if(card1.target < card2.target){
        return card2;
    }else{
        console.log(card1, card2)
        return {suit:'',value:'', target: -1}
    }
    
}

export function distribuiCartas(nameRoom, database){
    //criação de manilhas especiais direto na funcao do models

    var deckAUX = new Deck();
    deckAUX.createDeck()
    deckAUX.shuffle()

    //console.log(deckAUX)

    var deckA = []
    var deckB = []
    var i, j = 0;

    for(i = 0; i < 3; i++){
        deckA.push(deckAUX.getCard(j))
        j++;
    }
    //console.log(deckA)
    for(i = 0; i < 3; i++){
        deckB.push(deckAUX.getCard(j))
        j++;
    }
    var deck = deckA;
    update(ref(database, `/rooms/${nameRoom}/player1`), {deck});

    deck = deckB;
    update(ref(database, `/rooms/${nameRoom}/player2`), {deck});   
}

export function aceitarOuCorrer(player ,nameRoom, database){
    //confirm('Oi')
}

/**
 * @param  {} player
 * @param  {} nameRoom
 * @param  {} database
 */
export function pedirTruco(player, nameRoom, database){
    //pedir o truco

    update(ref(database, `/rooms/${nameRoom}/desk/truco`), {whoAsk: player})
    get(ref(database, `/rooms/${nameRoom}`)).then((data)=>{
        const mesa = data.val()
        const player1 = mesa.player1.nickname
        const player2 = mesa.player2.nickname

        if (player == player1){
            var playerWhoNeedAccepted = player2
            aceitarOuCorrer(playerWhoNeedAccepted, nameRoom, database)

        }else if(player == player2){
            var playerWhoNeedAccepted = player1
            aceitarOuCorrer(playerWhoNeedAccepted, nameRoom, database)
        }})
    

}

/**
 * @param  {} playerTruco
 * @param  {} playerAceita
 * @param  {} nameRoom
 * @param  {} database
 */
export function verificaTruco(playerTruco, playerAceita, nameRoom, database){
    //validador booleano do truco

    if(playerTruco != '' && playerAceita != ''){
        update(ref(database, `/rooms/${nameRoom}/desk/truco`), {trucoStatus: true});
        update(ref(database, `/rooms/${nameRoom}/desk`), {scoreRound: 3});
    }
}

function identificarQualJogador(winPlayer, player1, player2){
    if (winPlayer == player1){
        return 'player1'

    }else if (winPlayer == player2){
        return 'player2'

    }
}

export function verificaQuemGanha(nameRoom, database){
    get(ref(database, `/rooms/${nameRoom}`)).then((data)=>{
        const sala = data.val()
        const round1 = sala.desk.round1
        const round2 = sala.desk.round2
        const round3 = sala.desk.round3
        const empate = 'empate'
        const winList = [round1, round2, round3]
        const point = sala.desk.scoreRound

        const player1Points = sala.player1.pontos
        const player2Points = sala.player2.pontos
        const player1 = sala.player1.nickname
        const player2 = sala.player2.nickname

        if (winList.filter(player1) > winList.filter(player2)){
            var winPoint = point + player1Points
            update(ref(database, `/rooms/${nameRoom}/player1`), {pontos: winPoint})

        }else if (winList.filter(player1) < winList.filter(player2)){
            var winPoint = point + player2Points
            update(ref(database, `/rooms/${nameRoom}/player2`), {pontos: winPoint})

        }else if (winList[0] == empate && winList[1] != empate){
            const player = identificarQualJogador(winList[1], player1, player2)
            update(ref(database, `/rooms/${nameRoom}/${player}`), {pontos: winPoint})

        }else if (winList[1] == empate && winList[0] != empate){
            const player = identificarQualJogador(winList[0], player1, player2)
            update(ref(database, `/rooms/${nameRoom}/${player}`), {pontos: winPoint})

        }else if (winList[0] == empate && winList[1] == empate && winList[2] != empate){
            const player = identificarQualJogador(winList[2], player1, player2)
            update(ref(database, `/rooms/${nameRoom}/${player}`), {pontos: winPoint})

        }else if (winList[2] == empate && winList[0] != empate){
            const player = identificarQualJogador(winList[0], player1, player2)
            update(ref(database, `/rooms/${nameRoom}/${player}`), {pontos: winPoint})            

        }})
}