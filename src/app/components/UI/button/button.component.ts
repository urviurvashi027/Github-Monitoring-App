import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {


  //Input and Output Decorator
  @Input() buttonConfig: any;
  @Output() onClick = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  //OnClick Button Event to emit the click event
  onClickButton(event) {
    this.onClick.emit(event);
  }

}
