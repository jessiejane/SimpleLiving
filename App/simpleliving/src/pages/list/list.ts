import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  listNames: string[];
  items: Array<{title: string, note: number, icon: string}>;

  constructor(public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
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
}
