import { Component, OnInit,Input,SimpleChange } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tosterMessage} from '../../../shared/constants/constant';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  //input from home component
  @Input() tableArray: any;
  //variables
  showTable:boolean;
  didComponentInit:boolean;

  constructor(private toastr: ToastrService,) { 
    this.showTable = false;
  }

  ngOnChanges(changes:SimpleChange) {
   if(this.tableArray.data.length > 0){
    this.toastr.error(`${this.tableArray.data.length} ${tosterMessage.numberOfViolationErr}`);
    this.showTable = true;
    this.didComponentInit = false;
   }
   else if(this.didComponentInit) {
    this.toastr.info(tosterMessage.noViolationErr); 
    this.showTable = false;
   }
}

  ngOnInit() {
    this.didComponentInit = true;
  }

}
