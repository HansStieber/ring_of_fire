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
    this.newGame()
  }


  /**
   * The function sets the variable game to an object of the class Game.
   */
  newGame() {
    this.game = new Game();
    console.log(this.game);
  }


  /**
   * When a card is clicked the pickCardAnimation variable is set to true.
   */
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name) => {
      this.game.players.push(name);
    });
  }
}
