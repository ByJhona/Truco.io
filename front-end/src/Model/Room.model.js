export default class Room{
    constructor(room, desk, deck, player, count){
        this.count = count;
        this.room = room;
        this.desk = desk;
        this.deck = deck;
        this.player = player;

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

    getPlayer(){
        return this.player;
    }

    getCount(){
        return this.count;
    }

    

    
}