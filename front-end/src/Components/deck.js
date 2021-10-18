import Card from './card'

export default class Deck{

    constructor(){
        this.cards = []
    }

    createDeck(suits, values) {
        for(let suit of suits) {
          for(let value of values){
            this.cards.push(new Card(suit, value));
          }
        }
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

      getCard(i){
        return this.cards[i];
      }


}