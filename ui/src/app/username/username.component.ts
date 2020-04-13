import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "app-username",
  templateUrl: "./username.component.html",
  styleUrls: ["./username.component.css"]
})
export class UsernameComponent implements OnInit {
  // propriétés
  @Input()
  username: string;
  // événements custom
  @Output()
  userClicked = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onUsernameClicked() {
    alert("Vous avez clické sur : " + this.username);
    // on va propager un événement custom à l'attention
    // des composants qui utilisent 
    // <app-username></app-username> dans leur propre
    // template
    this.userClicked.emit(this.username);
  }
}
