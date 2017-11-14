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
  public updatedItem: any;
  public deletedItem: any;
  public selectedList: number;
  public count: number;
  public updateID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restService: RestService, private socket: Socket) 
  {
    this.socket.connect();
    this.restService.getLists().then(data => {
      this.lists = data.List;
    })

    this.getCount().subscribe(data => {
      this.updatedItem = data;
      console.log("** UPDATE COUNT OF ITEM " + this.updatedItem.ItemId + " to "  + this.updatedItem.Quantity);
      if (this.selectedList === this.updatedItem.ListId)
      {        
        this.restService.getLists().then(data => {
          this.lists = data.List;
          this.restService.getListItems(this.selectedList).then(data => {
            this.listitems = data.Item;
          });
        });
      }
    });


    this.getDeleteEvent().subscribe(data => {
      this.deletedItem = data;
        if (this.selectedList === this.deletedItem.ListId)
        {
          this.showItems(this.selectedList);
          console.log("** REMOVED DELETED ITEM " + this.selectedList);
        }
    });
  }

  updateCount(item: any){
    console.log("EMITTING CHANGE COUNT FOR " + item.ItemId + " TO " + item.Quantity);
    this.socket.emit('change-count', item);
  }

  updateDeletedItem(item: any){
    this.socket.emit('delete-item', item);
  }

  getCount() {
    let observable = new Observable(observer => {
      this.socket.on('update-count', (data) => {
        observer.next(data);
      });
      console.log('RECEIVING UPDATE COUNT');
    });
    return observable;
  }
  
  getDeleteEvent() {
    let observable = new Observable(observer => {
      this.socket.on('delete-item', (data) => {
        observer.next(data);
      });
      console.log('RECEIVING DELETE UPDATE');
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
    this.selectedItem = {ItemId: item.ItemId, Quantity: item.Quantity + 1, ListId: item.ListId};
    this.restService.updateListItemQuantity(this.selectedItem).then(data => {        
        this.updateCount(this.selectedItem);
      }
    );
  }
  
  removeItem(item: any) {
    if (item.Quantity > 1)
    {  
      this.selectedItem = {ItemId: item.ItemId, Quantity: item.Quantity - 1, ListId: item.ListId};
      this.restService.updateListItemQuantity(this.selectedItem).then(data => {        
          this.updateCount(this.selectedItem);
        }
      );
    }
  }
  
  deleteItem(item: any)
  {
	  this.restService.deleteListItem(item).then(data => {
          this.updateDeletedItem(item);
      });
  }
  
  pushPage(){
    //this.appCtrl.getRootNav().push(InventoryPage);
    this.navCtrl.push(ListPage);
  }
}
