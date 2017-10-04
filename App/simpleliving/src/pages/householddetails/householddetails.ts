import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { RestService } from '../../services/restService';

/*
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import { Http, Headers } from '@angular/http';
*/


@Component({
  selector: 'page-householddetails',
  templateUrl: 'householddetails.html'
})
export class HouseholdDetailsPage {
  detailSegment: string = "roommates";
  isAndroid: boolean = false;
  listitems: Array<any>;


  constructor(platform: Platform, public restService: RestService) {
    this.isAndroid = platform.is('android');

    this.restService.getAllUsersByHouseId(1).then(data => {
      this.listitems = data.User;
    });  
   
  }
}
