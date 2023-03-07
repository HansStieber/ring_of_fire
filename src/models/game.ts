export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';
    

    constructor() {
        /**
         * This loop pushes all cards into the stack array. After that the stack is shuffled.
         */
        for (let i = 1; i < 14; i++) {
            this.stack.push(i + '_of_clubs')
            this.stack.push(i + '_of_diamonds')
            this.stack.push(i + '_of_hearts')
            this.stack.push(i + '_of_spades')
        }
        shuffle(this.stack);
    }

    public toJSON() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        }
    }
}


/**
 * This function shuffles the values of a given array.
 * 
 * @param array - The array that is being shuffled.
 * @returns - The shuffled array.
 */
function shuffle(array: any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle.
    while (0 !== currentIndex) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}