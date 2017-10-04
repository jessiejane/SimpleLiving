import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../../services/restService'
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
public base64NoGarbase: string;
public total: number;
public camera: Camera;
  constructor(camera: Camera, public http: Http, public restService: RestService) {
    this.camera = camera;
  }
uploadImage() {
  this.restService.uploadImage(this.base64NoGarbase).then(data => {
          console.log(data);
          this.total = data.amount;
        })
}
takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.base64NoGarbase = imageData;
        this.uploadImage();
        //console.dir("base 64 image: "+this.base64NoGarbase);
    }, (err) => {
        console.log(err);
    });
  }
}
splitBill() {
  this.restService.SplitBill(this.total).then(data => {
          console.log(data);
        })
}
