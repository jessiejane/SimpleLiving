import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../../services/restService';

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
  smartStockInventory: any;
  smartStockItemId: any;
  icons: string[];
  listNames: string[];  
  items: Array<{title: string, note: number, icon: string}>;
  listitems: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public restService: RestService, private socket: Socket) 
  {
    this.socket.connect();

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
      
      this.restService.populateInventory().then(response => {
        this.listitems = response.Item;
      });
    
    this.getSmartStockEvent().subscribe(data => {
      this.smartStockInventory = data['count'];
      this.smartStockItemId = data['id'];
      this.restService.populateInventory().then(response => {
        this.listitems = response.Item;
      });
    });
  } 

  getSmartStockEvent() {
    let observable = new Observable(observer => {
      this.socket.on('change-smartstock-count', (data) => {
        observer.next(data);
      });
      console.log('RECEIVING SMARTSTOCK UPDATE');
    });
    return observable;
  }
     
    itemTapped(event, item) {     
    // That's right, we're pushing to o urselves!]
      this.navCtrl.push(InventoryPage, {
      item: item   
      });
  }

}
  

