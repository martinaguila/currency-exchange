import { Component } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import currencies from '../../assets/data/currencies.json'
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public currencies;
  public rateTime: any;
  public currRatesAll;
  public currRatesCustomized;
  public tableHeader: Array<any> = ['Currency', 'Rate'];
  public selectedAllBaseCurr;

  constructor(
    private exchangeService: ExchangeService,
    private loadingCtrl: LoadingController,
    private router: Router,
    public toastCtrl: ToastController
  ) {}
  
  ngOnInit(){
    this.currencies = JSON.parse(localStorage.getItem("currencies"));
    localStorage.setItem("currencies", JSON.stringify(this.currencies));
  }

  loader(){
    this.loadingCtrl.create({  
      message: 'Fetching data...'  
    }).then((res) => {   
      res.present();  
      res.onDidDismiss().then((dis) => {  
        console.log('Loading dismissed!');  
      });  
    });   
  }

  dismiss(){
    this.loadingCtrl.dismiss(); 
  }

  private loadCurrencies(){
    this.currencies = []
    this.exchangeService.currencies().subscribe(
      (res: any) => {
        let resultset: any = res;
      }, (error: any) => {
        console.log(error);
    });
  }

  public convertAllCurency(e, segment: string): void{
    this.selectedAllBaseCurr = e.detail.value;
    this.loader();
    this.exchangeService.exchange(e.detail.value).subscribe(
      (res: any) => {
        let resultset: any = res;
        this.rateTime = resultset.date;
        const entries = Object.entries(resultset.rates);
        let storedCurr = JSON.parse(localStorage.getItem("currencies"));
        let favCurr = [];
        let normalCurr = [];
        entries.forEach(x=>{
          storedCurr.forEach(c=>{
            if (x[0] === c.code && c.isFav == 1){
              console.log(c)
              favCurr.push(x[0], x[1]);
            }else if (x[0] === c.code && c.isFav == 0){
              normalCurr.push(x[0], x[1]);
            }
          });
        });
        // convert array into array of objects
        for(let i = 0; i < favCurr.length; i++) {
          favCurr[i] = {code: favCurr[i], currency: favCurr[i + 1], isFav: 1};
        }
        for(let i = 0; i < normalCurr.length; i++) {
          normalCurr[i] = {code: normalCurr[i], currency: normalCurr[i + 1]};
        }
        favCurr = favCurr.filter(function(v, i) {
          return i % 2 == 0;
        });
        normalCurr = normalCurr.filter(function(v, i) {
          return i % 2 == 0;
        });
        // consolidate 2 arrays
        this.currRatesAll = [...favCurr, ...normalCurr];
        console.log(this.currRatesAll)
        this.dismiss();
      }, (error: any) => {
        console.log(error);
        this.dismiss();
        this.presentToast('Something went wrong.');
    });
    
  }

  public rateDetail(rate){
    localStorage.setItem("currCode", rate);
    this.router.navigate(['/tabs/tab2'])
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }
}
