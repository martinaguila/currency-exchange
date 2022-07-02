import { Component } from '@angular/core';
import currencies from '../assets/data/currencies.json'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  currentPageTitle = 'Dashboard';

  appPages = [
    {
      title: 'Settings',
      url: '/tabs/tab3',
      icon: 'settings'
    }
  ];

  ngOnInit(){
    console.log(localStorage.getItem("currencies"))
    if (localStorage.getItem("currencies")){

    }else{
      localStorage.setItem("currencies", JSON.stringify(currencies))
    }
    
  }
}
