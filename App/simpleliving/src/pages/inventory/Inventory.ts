import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/*
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import { Http, Headers } from '@angular/http';
*/


@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html'
})
export class InventoryPage {
  selectedItem: any;
  icons: string[];
  listNames: string[];
  items: Array<{title: string, note: number, icon: string}>;
  listitems: Array<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.listNames = ['Groceries', 'Bills', 'Cleaning Supplies', 'Household Chores',
    'Maintenance Requests', 'Hardware', 'Events']

    this.icons = ['basket', 'cash', 'cart', 'clipboard', 'hammer', 'bulb', 'beer' ];

    this.items = [];
    for (let i = 1; i < this.listNames.length; i++) {
      this.items.push({
        title: this.listNames[i-1],
        note: i,
        icon: this.icons[i-1]
      });
    }
    this.populateInventory().then(response => {
    this.listitems = response.Item;
  });
  }
  populateInventory(): Promise<any> {
    let headers = new Headers();
    headers.append("Content-Type","application/json");
    return this.http.get("https://97de7914.ngrok.io/api/items")
    .map(response => {
      return response.json() || {success: false, message: "No response from server"};
    }).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }
  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(InventoryPage, {
      item: item
    });
  }
}
