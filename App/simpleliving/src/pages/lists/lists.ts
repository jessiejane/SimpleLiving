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
  public lists: Array<any>;
  public listitems: Array<any>;
  public selectedItem: any;
  public selectedList: number;
  //items: Array<{title: string, note: number, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService) 
  {
    this.restService.getLists().then(data => {
      this.lists = data.List;
    })
  }
  
  showItems(listid: number ) {
    this.restService.getListItems(listid).then(data => {
        this.listitems = data.Item;
		this.selectedList = listid;
      });	  
    console.log('get items for listid: '+listid);
  }

  addItem(item: any) {
	this.selectedItem = item;
    this.selectedItem.Quantity +=1;
    this.restService.updateListItemQuantity(this.selectedItem);
  }
  
  removeItem(item: any) {
	this.selectedItem = item;
	if (this.selectedItem.Quantity > 1)
	{
		this.selectedItem.Quantity -=1;
		this.restService.updateListItemQuantity(this.selectedItem);
	}
  }
  
  deleteItem(item: any)
  {
	  this.restService.deleteListItem(item).then(data => {
          this.showItems(item.ListId);
      });
  }
  
  pushPage(){
    //this.appCtrl.getRootNav().push(InventoryPage);
    this.navCtrl.push(ListPage);
  }
}
