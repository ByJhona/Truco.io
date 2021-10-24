
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
