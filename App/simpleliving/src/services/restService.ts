"use strict"
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './configService';

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
}