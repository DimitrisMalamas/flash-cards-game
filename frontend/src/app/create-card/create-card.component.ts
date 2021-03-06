import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../card';
import { CardService } from '../card.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
  providers: [ CardService ]
})
export class CreateCardComponent implements OnInit {
  @Input() deckId: number = null;
  cards : Card[];
  loggedin: boolean;
  constructor(private router: Router,
              private cardService: CardService,
              private authService: AuthService) { }
  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser != null && currentUser.token != null) {
      this.loggedin = true;
    }
  }
  add(question: string, answer: string): void {
    question = question.trim();
    answer = answer.trim();
    if (!question) { return; }
    this.cardService.create(this.deckId, question, answer);
  }
}
