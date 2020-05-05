import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

import { Organisation } from '../model/organisation';
import { LocalStorageService } from './local-storage.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient,private _localStorageService:LocalStorageService) { }

  //fetching org details
  getOrganisationDetail(orgName) : Observable<Organisation>{
    return this._http.get<Organisation>(`https://api.github.com/orgs/${orgName}`)
  }

  //creating list from mulitple api call using forkJoin
  getOrganisationRepoDetailList() : Observable<any[]>{
    const multiPuts = [];
    var list = this._localStorageService.getOrganisation();
    list.forEach(element => {
      console.log(element.login);
      multiPuts.push(this.getOrganisationRepoDetail(element.login));
    });
    return forkJoin(...multiPuts);
  }

  // fetching repo details
  getOrganisationRepoDetail(orgName) : Observable<Organisation>{
    return this._http.get<Organisation>(`https://api.github.com/orgs/${orgName}/repos`)

  }

}
