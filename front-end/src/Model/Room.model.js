export default class Room{
    constructor(room, desk, deck, player1, count){
        this.count = count;
        this.room = room;
        this.desk = desk;
        this.deck = deck;
        this.player1 = player1;

    }

    getRoom(){
        return this.room;
    }

    getDesk(){
        return this.desk;
    }

    getDeck(){
        return this.deck;
    }

    getPlayer1(){
        return this.player1;
    }

    getCount(){
        return this.count;
    }

    

    
}