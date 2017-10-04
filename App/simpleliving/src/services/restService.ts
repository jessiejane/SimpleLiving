"use strict"
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './configService';
import { Injectable } from '@angular/core';

@Injectable()
export class RestService {

    private requestUrl: string;
    constructor(public http: Http, public configService: ConfigService) {
        this.requestUrl = this.configService.getRestEndPointUrl();
    }

    populateInventory(): Promise<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.get(this.requestUrl + "items")
            .map(response => {
                return response.json() || { success: false, message: "No response from server" };
            }).catch((error: Response | any) => {
                return Observable.throw(error.json());
            }).toPromise();
    }
    uploadImage(imageStr: string): Promise<any> {
        let headers = new Headers();
         headers.append("Content-Type","application/json");
         let body = {
           imageData: imageStr
         };
         //post device token to server, server url coming from secure tunnel to localhost generated by ngRok plugin
      return this.http.post(this.requestUrl+"imageAmount", JSON.stringify(body), {headers: headers})
         .map(response => {
          return response.json() || {success: false, message: "No response from server"};
        }).catch((error: Response | any) => {
          return Observable.throw(error.json());
        }).toPromise()
    }

    getLists(): Promise<any> {
        return this.http.get(this.requestUrl+"lists")
         .map(response => {
                return response.json() || { success: false, message: "No response from server" };
            }).catch((error: Response | any) => {
                return Observable.throw(error.json());
            }).toPromise();
    }

    getListItems(listid: number): Promise<any> {
         return this.http.get(this.requestUrl+"lists/"+listid+"/items")
         .map(response => {
                return response.json() || { success: false, message: "No response from server" };
            }).catch((error: Response | any) => {
                return Observable.throw(error.json());
            }).toPromise();
    }
    updateListItemQuantity(item: any): Promise<any> {
        let headers = new Headers();
         headers.append("Content-Type","application/json");
         let body = {
           item: item
         };
         //post device token to server, server url coming from secure tunnel to localhost generated by ngRok plugin
      return this.http.post(this.requestUrl+"items/"+item.ItemId, JSON.stringify(body), {headers: headers})
         .map(response => {
          return response.json() || {success: false, message: "No response from server"};
        }).catch((error: Response | any) => {
          return Observable.throw(error.json());
        }).toPromise()
    }
}