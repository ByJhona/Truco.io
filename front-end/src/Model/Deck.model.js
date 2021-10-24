import Card from './Card.model'

export default class Deck{

    constructor(){
        this.cards = []
    }

    createDeck() {

      //familias
      this.cards.push(new Card("diamonds", "jack", 1));
      this.cards.push(new Card("hearts", "jack", 1));
      this.cards.push(new Card("clubs", "jack", 1));
      this.cards.push(new Card("spades", "jack", 1));

      this.cards.push(new Card("diamonds", "queen", 2));
      this.cards.push(new Card("hearts", "queen", 2));
      this.cards.push(new Card("clubs", "queen", 2));
      this.cards.push(new Card("spades", "queen", 2));

      this.cards.push(new Card("diamonds", "king", 3));
      this.cards.push(new Card("hearts", "king", 3));
      this.cards.push(new Card("clubs", "king", 3));
      this.cards.push(new Card("spades", "king", 3));

      this.cards.push(new Card("diamonds", "ace", 4));
      this.cards.push(new Card("hearts", "ace", 4));
      this.cards.push(new Card("clubs", "ace", 4));

      //Comuns
      this.cards.push(new Card("diamonds", 2, 5));
      this.cards.push(new Card("hearts", 2, 5));
      this.cards.push(new Card("clubs", 2, 5));
      this.cards.push(new Card("spades", 2, 5));

      this.cards.push(new Card("diamonds", 3, 6));
      this.cards.push(new Card("hearts", 3, 6));
      this.cards.push(new Card("clubs", 3, 6));
      this.cards.push(new Card("spades", 3, 6));
        
      //criando algumas manilhas especiais
      this.cards.push(new Card("spades", "ace", 9));
      this.cards.push(new Card("hearts", 7, 10));
      this.cards.push(new Card("diamonds", 7, 8));
      this.cards.push(new Card("clubs", 4, 11));
      this.cards.push(new Card("joker", "black", 7));

      return this.cards;
    }

    shuffle() {
        let counter = this.cards.length, temp, i;
        while(counter) {
          i = Math.floor(Math.random() * counter--);
          temp = this.cards[counter];
          this.cards[counter] = this.cards[i];
          this.cards[i] = temp;
        }
        return this.cards;
      }
      getDeck(){
        return this.cards;
      }

      getCard(i){
        return this.cards[i];
      }


}