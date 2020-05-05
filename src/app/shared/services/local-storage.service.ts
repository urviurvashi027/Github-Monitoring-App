import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  orgList: any = [];

  constructor() { }

  //adding organisation in the list
  onAddOrgainstion = (obj) => {
    var {login,id,repos_url,public_repos,created_at,updated_at,type} = obj;
    var newObj = {
      login:login,
      id:id,
      repos_url:repos_url,
      public_repos:public_repos,
      created_at:created_at,
      updated_at:updated_at,
      type:type
    }
    try{
      if(localStorage.getItem('orgList')){
        this.orgList = JSON.parse(localStorage.getItem('orgList'));
        this.orgList.push(newObj);
      }
      else{
        this.orgList.push(newObj);
      }
      localStorage.setItem('orgList',JSON.stringify(this.orgList));
    }
    catch(err){
      console.log("error from localStorageService onAddOrgainstion",err);
    }
  }

  //get orgaisation details from local storage
  getOrganisation = () => {
    try{
      if(localStorage.getItem('orgList')){
        return JSON.parse(localStorage.getItem('orgList'));
      }
     else{
       return false;
     }
    }
    catch(err){
      console.log("error from localStorageService getOrganisation",err);
    }

  }
}
