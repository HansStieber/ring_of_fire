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
    { title: 'Thumbmaster', description: '' },
    { title: 'Men', description: 'All men drink!' },
    { title: 'Quizmaster', description: '' },
    { title: 'Never have I ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' }
  ]

  title: string = '';
  description: string = '';
  @Input() card!: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[0];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
