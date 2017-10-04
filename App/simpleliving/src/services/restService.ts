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

    public populateInventory(): Promise<any> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        return this.http.get(this.requestUrl + "lists/3/items")
            .map(response => {
                return response.json() || { success: false, message: "No response from server" };
            }).catch((error: Response | any) => {
                return Observable.throw(error.json());
            }).toPromise();
    }

    public uploadImage(imageStr: string): Promise<any> {
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
	
	splitBill(splitTotal: number): Promise<any> {
        let headers = new Headers();
		var amount = splitTotal/4;
         headers.append("Content-Type","application/json");
         let body = {
			"users": [
						{
							"userId": "2",
							"amount": amount
						},
						{
							"userId": "3",
							"amount": amount
						},
						{
							"userId": "4",
							"amount": amount
						}
					]
			, 
			"fromUser" : "1",
			"description" : "test",
			"type" : "Utilities"
		};
         //post device token to server, server url coming from secure tunnel to localhost generated by ngRok plugin
      return this.http.post(this.requestUrl+"createTransaction", JSON.stringify(body), {headers: headers})
         .map(response => {
          return response.json() || {success: false, message: "No response from server"};
        }).catch((error: Response | any) => {
          return Observable.throw(error.json());
        }).toPromise()
    }

    public getLists(): Promise<any> {
        return this.http.get(this.requestUrl+"lists")
         .map(response => {
                return response.json() || { success: false, message: "No response from server" };
            }).catch((error: Response | any) => {
                return Observable.throw(error.json());
            }).toPromise();
    }

    public getListItems(listid: number): Promise<any> {
         return this.http.get(this.requestUrl+"lists/"+listid+"/items")
         .map(response => {
                return response.json() || { success: false, message: "No response from server" };
            }).catch((error: Response | any) => {
                return Observable.throw(error.json());
            }).toPromise();
    }

    public getAllUsersByHouseId(houseId: number): Promise<any> {
        return this.http.get(this.requestUrl+"house/"+houseId+"/users")
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

    updateSSQuantity(): Promise<any> {
      console.log("Update Smark Stock Item")
      //TODO render this data dynamically from sensor
      var item: any = {};
      item.HouseId = "1";
      item.Quantity = "0";
      item.IsSmartStock = "1";
      item.ItemId= "1";
      item.Name= "Angel Soft 2 Ply Toilet Paper";
      item.ListId= "3";
      item.Description= "Protein";
      item.AmazonProductUrl= "B00FFJ2LXU";
      item.SensorReading = undefined;
      let headers = new Headers();
         headers.append("Content-Type","application/json");
         let body = {
           item: item
         };
         //post device token to server, server url coming from secure tunnel to localhost generated by ngRok plugin
      return this.http.patch(this.requestUrl+"items/"+item.ItemId, JSON.stringify(body), {headers: headers})
         .map(response => {
          return response.json() || {success: false, message: "No response from server"};
        }).catch((error: Response | any) => {
          return Observable.throw(error.json());
        }).toPromise()

    }

	
	public getAllTransactionsByHouseId(houseId: number): Promise<any> {
        return this.http.get(this.requestUrl+"transactions/"+houseId)
        .map(response => {
               return response.json() || { success: false, message: "No response from server" };
           }).catch((error: Response | any) => {
               return Observable.throw(error.json());
           }).toPromise();
   }

}