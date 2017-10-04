import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ListsPage } from '../pages/lists/lists';
import { BillSplitterPage } from '../pages/billSplitter/billsplitter';
import { HistoryPage } from '../pages/history/history';
import { InventoryPage } from '../pages/inventory/inventory';
import { HouseholdDetailsPage } from '../pages/householddetails/householddetails';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'fae29603'
  },
  'push': {
    'sender_id': '11223344',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ListsPage,
    BillSplitterPage,
    HistoryPage,
    InventoryPage,
    HouseholdDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ListsPage,
    BillSplitterPage,
    HistoryPage,
    InventoryPage,
    HouseholdDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera
  ]
})
export class AppModule {}
