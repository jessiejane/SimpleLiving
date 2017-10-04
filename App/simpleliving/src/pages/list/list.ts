import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  listNames: string[];
  secondListNames: string[]
  items: Array<{title: string, note: number, icon: string}>;
  listItems: Array<{title: string, note: number }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.icons = ['basket', 'cash', 'cart', 'clipboard', 'hammer', 'bulb', 'beer' ];

    this.listNames = ['Groceries', 'Bills', 'Cleaning Supplies', 'Household Chores',
    'Maintenance Requests', 'Hardware', 'Events']
    this.secondListNames = ['Milk', 'Eggs', 'Bread']
    this.items = [];
    this.listItems = [];

    for (let i = 1; i < this.listNames.length; i++) {
      this.items.push({
        title: this.listNames[i-1],
        note: i,
        icon: this.icons[i-1]
      });
    }

    for (let i = 1; i < this.secondListNames.length; i++) {
      this.listItems.push({
        title: this.secondListNames[i-1],
        note: i
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item

    });
  }
}
