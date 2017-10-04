import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { InventoryPage } from '../inventory/inventory';
import { RestService } from '../../services/restService'
@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {
  icons: string[];
  lists: Array<any>;
  //items: Array<{title: string, note: number, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService) {

    // this.icons = ['basket', 'cash', 'cart', 'clipboard', 'hammer', 'bulb', 'beer' ];
    // this.listNames = ['Groceries', 'Bills', 'Cleaning Supplies', 'Household Chores',
    // 'Maintenance Requests', 'Hardware', 'Events']
    // this.items = [];

    // for (let i = 1; i < this.listNames.length; i++) {
    //   this.items.push({
    //     title: this.listNames[i-1],
    //     note: i,
    //     icon: this.icons[i-1]
    //   });
    // }
    this.restService.getLists().then(data => {
      this.lists = data.List;
    })
  }
  showItems(listid: number ) {
    console.log('get items for listid: '+listid);
  }
  pushPage(){
    //this.appCtrl.getRootNav().push(InventoryPage);
    this.navCtrl.push(ListPage);
  }
}
