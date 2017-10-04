import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { InventoryPage } from '../inventory/inventory';

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {
  icons: string[];
  listNames: string[];
  items: Array<{title: string, note: number, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.icons = ['basket', 'cash', 'cart', 'clipboard', 'hammer', 'bulb', 'beer' ];
    this.listNames = ['Groceries', 'Bills', 'Cleaning Supplies', 'Household Chores',
    'Maintenance Requests', 'Hardware', 'Events']
    this.items = [];

    for (let i = 1; i < this.listNames.length; i++) {
      this.items.push({
        title: this.listNames[i-1],
        note: i,
        icon: this.icons[i-1]
      });
    }
  }

  pushPage(){
    //this.appCtrl.getRootNav().push(InventoryPage);
    this.navCtrl.push(ListPage);
  }
}
