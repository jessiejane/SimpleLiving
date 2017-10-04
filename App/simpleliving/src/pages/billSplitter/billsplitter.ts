import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
/*
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import { Http, Headers } from '@angular/http';
*/


@Component({
  selector: 'page-billsplitter',
  templateUrl: 'billsplitter.html'
})
export class BillSplitterPage {
public base64Image: string;
public camera: Camera;
  constructor(camera: Camera) {
    this.camera = camera;
  	//this.takePicture()
  }

takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
}
