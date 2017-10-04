import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

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
  mockNames: string[];
  mockNumbers: string[];
  imageThumbnail: string[];
  items: Array<{mockNames: string, mockNumbers: string, imageThumbnail:string}>;


  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');

    this.mockNames = ["FirstName LastName", "FirstName LastName2",
    "FirstName LastName3"]
    this.mockNumbers = ["123456789","221465798","098765432"]
    this.imageThumbnail = ["assets/img/imgPlaceHolder.png"]

    this.items = []
    for (let i = 0; i < this.mockNames.length; i++) {
      this.items.push({
        mockNames: this.mockNames[i],
        mockNumbers: this.mockNumbers[i],
        imageThumbnail: this.imageThumbnail[0],
      })
    }
  }
}
