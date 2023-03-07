import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { collectionData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
/**
   * The variable game hast the type 'Game'.
   */
  game!: Game;
  games$!: Observable<any>;
  games!: Array<any>[];
  id!: string;
  coll: any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) { }


  /**
   * The function Runs the newGame function on initialization of the page.
   */
  ngOnInit(): void {
    this.coll = collection(this.firestore, 'games');
    this.games$ = collectionData(this.coll);
    this.newGame();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.games$.subscribe( () => {
        this.getCorrectDocument();
      })
    })
  }

  async getCorrectDocument() {
    let docRef = doc(this.firestore, "games" ,this.id);
    let docSnap = await getDoc(docRef);
    let data = await docSnap.data();
    this.updateData(data);
  }

  updateData(data: any) {
    this.game.players = data['players'];
    this.game.stack = data['stack'];
    this.game.playedCards = data['playedCards'];
    this.game.currentPlayer = data['currentPlayer'];
    this.game.pickCardAnimation = data['pickCardAnimation'];
    this.game.currentCard = data['currentCard'];
  }

  saveGame() {
    let docRef = doc(this.firestore, "games", this.id);
    updateDoc(docRef, this.game.toJSON());
  }


  /**
   * The function sets the variable game to an object of the class Game.
   */
  newGame() {
    this.game = new Game();
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
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.pickCardAnimation = true;
      this.saveGame();

      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.playedCards.push(this.game.currentCard);
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
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
        this.saveGame();
      }
    });
  }
}