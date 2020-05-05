import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  //Input and //Output Decorator
  @Input() inputConfig: any;
  @Output() onInputClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  //on Model changes event
  inputHandler(){
      this.onInputClick.emit();
  }

}
