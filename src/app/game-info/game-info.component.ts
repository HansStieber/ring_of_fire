import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, the others can stop drinking too.' },
    { title: 'You', description: 'You can choose someone to drink.' },
    { title: 'Me', description: 'Congrats! You must drink.' },
    { title: 'Category', description: 'Pick a category such as football. Then you go in a circle and everyone has to say a word that fits with category, such as: touchdown, field goal, USC. Whoever messes up, drinks.' },
    { title: 'Bust a jive', description: 'Player 1 performs a dance move. Player 2 repeats the dance move and adds a second one' },
    { title: 'Women', description: 'All women drink!' },
    { title: 'Heaven', description: 'Put your hands up. The last player drinks.' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'You must pour a little of your drink into the cup that is in the middle of the table. Whomever picks up the LAST king must drink the whole cup, which could be filled with different drinks, so who knows how bad it could taste!' },
    { title: 'Men', description: 'All men drink!' },
    { title: 'Quizmaster', description: 'Go around in a circle and you have to keep asking questions to each other. Doesn’t matter what the question is, as long as its a question. Whoever messes up and does not say a question, drinks.' },
    { title: 'Never have I ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' }
  ]

  title: string = '';
  description: string = '';
  @Input() card!: string;

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * This function plays when the card property changes. If there is a value, the function sets a variable cardNumber and puts the
   * number of card (first part of the string) as the value. Then it sets the title and description variable to the corresponding
   * title and description of the cardAction array.
   */
  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[0];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
