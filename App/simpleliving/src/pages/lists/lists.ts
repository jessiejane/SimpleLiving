import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';
import { ListPage } from '../list/list';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
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
  public count: number;
  //items: Array<{title: string, note: number, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, private socket: Socket) 
  {
    this.socket.connect();
    this.restService.getLists().then(data => {
      this.lists = data.List;
    })

    this.getCount().subscribe(data => {
      this.count = data['text'];
      console.log("UPDATE COUNT: " + this.count);
    });
  }

  updateCount(count: number){
    console.log("EMITTING CHANGE COUNT " + count);
    this.socket.emit('change-count', count);
  }

  getCount(){
    let observable = new Observable(observer => {
      this.socket.on('update-count', (data) => {
        observer.next(data);
      });
      console.log('RECEIVING UPDATE COUNT');
    });
    return observable;
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
    this.updateCount(this.selectedItem.Quantity);
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
