import {
  Directive,
  EventEmitter,
  HostListener,
  OnInit,
  Output
} from '@angular/core';
import { Subject,Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnInit  {

  //output decorator for button component
  @Output() debounceClick = new EventEmitter();
  //subject and subscription
  private clicks = new Subject();
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.subscription = this.clicks
      .pipe(debounceTime(500))
      .subscribe(e => this.debounceClick.emit(e));
  }

  //unscription on ngOnDestroy 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //listen to host click event
  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

}


