import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { addDoc, collection } from '@firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent {
  constructor(private firestore: Firestore, private router: Router) {}

  showStartButton = true;


  /**
   * The function Runs the animateStartButton function on initialization of the page.
   */
  ngOnInit() {
    this.animateStartButton();
  }


  /**
   * The function sets the showStartButton variable to false and then to true again. The function is repeated every 4 seconds. When
   * the boolean is true, the start button is added again to the startscreen and its animation is played again.
   */
  animateStartButton() {
    setInterval(() => {
      this.showStartButton = false;
      setTimeout(() => {
        this.showStartButton = true;
      }, 1);
    }, 2000);
  }


  /**
   * The function changes the route by URL and navigates to the game.component.html page
   */
  newGame() {
    let game = new Game;
    let coll = collection(this.firestore, 'games');
    addDoc(coll, game.toJSON())
    .then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo.id);
    });
  }
}
