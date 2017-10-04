import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import { Http, Headers } from '@angular/http';
import { ConfigService } from '../../services/configService'
import { AlertController } from 'ionic-angular';
import { RestService } from '../../services/restService'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  icons: string[];
  eventSummary: string[];
  eventTime: string[];
  imageThumbnail: string[];
  items: Array<{eventSummary: string, eventTime: string, icons: string, imageThumbnail:string}>;
  listTransactions: Array<any>;

  constructor(public navCtrl: NavController, public push: Push, public http: Http, public config: ConfigService,public alertCtrl: AlertController, public restService: RestService) {
    var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
    if ( app ) {
        //we are running on a device
        this.registerForPush();
    } 
	
	 
	this.restService.getAllTransactionsByHouseId(1).then(data => {
		this.listTransactions = data.Item;
	});
  }
presentAlert() {
  const alert = this.alertCtrl.create({
    title: 'Smart Stock Update',
    subTitle: 'You now have 0 Toilet Paper rolls left',
    buttons: [{text:'Update My List',
    handler: () => {
      this.restService.updateSSQuantity().then(res =>{
        console.log(res);
      })
    }},
    {text:'Restock on Amazon',
    handler: () => {
      window.open("https://www.amazon.com/gp/cart/aws-merge.html?cart-id=133-8971498-2032938&associate-id=123402bb-20&hmac=uztkD9ycMp52gsM%2FIqAIFA9rscQ%3D&SubscriptionId=AKIAJONRAXIF4HTX73DQ&MergeCart=False",'_system', 'location=yes');

    }},
    'Don\'t Update']
  });
  alert.present();
}

  public registerForPush() {
		//below code will throw an error if not running on a device
	  	 this.push.register().then((t: PushToken) => {
		  return this.push.saveToken(t, {ignore_user: true});
		 }).then((t: PushToken) => {
			  console.log(t.token);
	 		  let headers = new Headers();
	 		  headers.append("Content-Type","application/json");
	 		  let body = {
	 		  	token: t.token
	 		  };
         console.log("posting to: "+this.config.getRestEndPointUrl()+"token");
	 		  //post device token to server, server url coming from secure tunnel to localhost generated by ngRok plugin
	 		 this.http.put(this.config.getRestEndPointUrl()+"token", JSON.stringify(body), {headers: headers})
	 		  .map(res => res.json())
	 		  .subscribe(data => {
	 		  	console.log(data);
	 		  });
 		});

		this.push.rx.notification()
		  .subscribe((msg) => {
        //console.log("notification received: "+ JSON.stringify(msg));
        if (msg.raw.additionalData.messageFrom != "smartStock")
		      alert(/*msg.title + ': ' + */ msg.text);
        else {
          this.presentAlert();
        }
		});}
}
