import { Component } from '@angular/core';
import { Router } from '@angular/router';
import currencies from '../../assets/data/currencies.json'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public currenciesArr;
  public tableHeader: Array<any> = ['Code', 'Currency', ''];

  constructor(
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(){
    this.currenciesArr = JSON.parse(localStorage.getItem("currencies"));
    console.log(this.currenciesArr)
  }

  public toHome(){
    this.router.navigate(['/tabs/tab1'])
  }

  public search(e): void{
    if (e.detail.value.length == 3){
      const filterdCode = this.currenciesArr.filter(x=>x.code === e.detail.value.toUpperCase());
      this.currenciesArr = filterdCode;
      // this.currenciesArr.forEach(x=>{
      //   if (x.code === e.detail.value.toUpperCase()){
      //     x.isFav = 1;
      //   }
      // });
    } else if (e.detail.value.length < 3 || e.detail.value.length > 3){
      this.currenciesArr = JSON.parse(localStorage.getItem("currencies"));
      localStorage.setItem("currencies", JSON.stringify(this.currenciesArr));
    }
  }

  public addToFave(status, code, msg){
    this.currenciesArr.forEach(x=>{
      if (x.code === code){
        x.isFav = status;
      }
    });
    console.log(this.currenciesArr);
    localStorage.setItem("currencies", JSON.stringify(this.currenciesArr));
    this.presentToast(msg);
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
