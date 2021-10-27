export default class Room {
    constructor(room, desk, player1) {

        this.room = room;
        this.desk = desk;

        this.player1 = player1;


    }


    getRoom() {
        return this.room;
    }

    getDesk() {
        return this.desk;
    }

    getPlayer1() {
        return this.player1;
    }






}