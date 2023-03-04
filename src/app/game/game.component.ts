import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  /**
   * The variable game hast the type 'Game'.
   */
  game!: Game;

  constructor(public dialog: MatDialog) { }


  /**
   * The function Runs the newGame function on initialization of the page.
   */
  ngOnInit(): void {
    this.newGame();
  }


  /**
   * The function sets the variable game to an object of the class Game.
   */
  newGame() {
    this.game = new Game();
    console.log(this.game);
  }


  /**
   * The function checks if all cards are played. If all cards are played it starts a new game. If not it checks if there are less 
   * than two players. If yes it opens the dialog to add a new player. If enough players are there, it picks a card.
   */
  takeCard() {
    if (this.allCardsPlayed()) {
      this.newGame();
    } else {
      if (this.lessThanTwoPlayers()) {
        this.openDialog();
      } else {
        this.pickCard();
      }
    }
  }


  /**
   * The function returns if the length of the stack array is 0.
   * 
   * @returns - The function returns a boolean if the array is 0.
   */
  allCardsPlayed() {
    return this.game.stack.length == 0;
  }


  /**
   * The function returns if the players array is less or equal 1, meaning there are less than two players.
   * 
   * @returns - The function returns a boolean if the players array is less or equal 1.
   */
  lessThanTwoPlayers() {
    return this.game.players.length <= 1;
  }


  /**
   * The function plays when the pickCardAnimation variable is set to false. Then it sets the currentCard variable to the value of
   * the last card at the stack array. It also sets the pickCardAnimation variable to true, which then triggers the pick animation.
   * After a timeout the pickCardAnimation variable is set to false again. The currentCard is pushed into the playedCards array.
   * The next player is selceted. A modulo operator sets the currentPlayer to 0 again if players.length is reached.
   */
  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }, 1000);
    }
  }


  /**
   * This function from the material design dialog opens the dialog window.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
