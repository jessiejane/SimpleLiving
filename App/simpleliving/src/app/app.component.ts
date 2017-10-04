import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ListsPage } from '../pages/lists/lists';
import { BillSplitterPage } from '../pages/billSplitter/billsplitter';
import { HistoryPage } from '../pages/history/history';
import { InventoryPage } from '../pages/inventory/inventory';
import { HouseholdDetailsPage } from '../pages/householddetails/householddetails';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Lists', component: ListPage },
      { title: "Inventory", component:InventoryPage},
      { title: "Bill Splitter", component: BillSplitterPage },
      { title: "Household Details", component:HouseholdDetailsPage },
      { title: "Graphs & Reports", component: HistoryPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
