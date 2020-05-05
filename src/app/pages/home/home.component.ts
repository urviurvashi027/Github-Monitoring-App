import { Component, OnInit} from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationExtras } from '@angular/router';
//model
import { Organisation } from '../../shared/model/organisation';
//services
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { tosterMessage} from '../../shared/constants/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //varibales
  organisation  = [];
  showOrganisationList: boolean;
  showTable:boolean;

  dateFrom: any = null;
   addOrgBtnConfig = {
    text: "Add Organisation",
    styles:{
      backgroundColor:'#02A3F9',
      borderColor:"2px solid #02A3F9",
      color:"white",
    }   
  }

  inputConfig = {
    placeholder: "Enter Organisation",
    data:null
  }

  monitorBtnConfig = {
    text: "Monitor All Organisation",
    styles:{
      backgroundColor:'#02A3F9',
      borderColor:"2px solid #02A3F9",
      color:"white",
      float:"right"
    }   
  }

  tableData = {
    headers:[{
      name:"Organisation ID",
      key:"orgId"
    },{
      name:"Organisation Name",
      key:"orgName"
    },
    {
      name:"Violating Respository ID",
      key:"repoId"
    },
    {
      name:"Respository name",
      key:"repoName"
    }],
    data:[]
  }


  constructor(private dataService : DataService, private toastr: ToastrService,
        private localStorageService:LocalStorageService) {
        this.showOrganisationList = false;  
        this.showTable = false;
   }

  ngOnInit() {
    localStorage.setItem('token',"0ba6ac10fb7f323b342b7983f4ecde156693a7a1")
    if(this.localStorageService.getOrganisation()){
      this.showOrganisationList = true;
      this.organisation = this.localStorageService.getOrganisation();
    }
    else{}
  }

  //on click of add org button function called
  onAddOrganisation = (event) => {
    if(this.inputConfig.data){
      if(!this.orgExist(this.inputConfig.data)){
        this.dataService.getOrganisationDetail(this.inputConfig.data).subscribe((organisation : Organisation) =>{
          this.showOrganisationList = true;
            this.organisation.push(organisation);
            this.localStorageService.onAddOrgainstion(organisation);
        },
        (error) => { //Error callback
          this.toastr.error(tosterMessage.orgNotFound);
          //throw error;   //You can also throw the error to a global error handler
        })
      }
      else{
        this.toastr.error(tosterMessage.orgExistsErr);
      }
    }
    else{
      this.toastr.error(tosterMessage.enterDataErr);
    }


  }

  //check for org dulpicacy
  orgExist = (orgName) => {
    return this.organisation.some((el) => {
      return el.login === orgName;
    }); 
  }

  onInputchange = () => {}

  //on click of monitor button
  onMonitorBtnClicked = () => {
    this.showTable = true;
    this.tableData.data = [];
    this.dataService.getOrganisationRepoDetailList().subscribe(res =>{
    if(res.length === 1 && res[0].length === 0){
      this.toastr.info(tosterMessage.noViolationErr);
    }
    else{
      res.forEach((r) => {
        this.createTableData(r);
      });
    } 
    })
  }

  //create table function
  createTableData = (data) => {
    if(data.length > 0){
      data.forEach(element => {
        if(element.private || element.forks > 0){
          var {id,name,owner} = element;
          this.tableData.data.push({
            orgId : owner.id,
            repoId:  id,
            repoName: name,
            orgName: owner.login
          })
          }
          else{
            
          }
          this.tableData = JSON.parse(JSON.stringify(this.tableData))
      });
    }
    else{}

  }

}
