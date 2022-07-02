import { Component } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import currencies from '../../assets/data/currencies.json'
import { LoadingController } from '@ionic/angular';
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
    private router: Router
  ) {}
  
  ngOnInit(){
    this.currencies = JSON.parse(localStorage.getItem("currencies"));
    localStorage.setItem("currencies", JSON.stringify(this.currencies));
    console.log(JSON.parse(localStorage.getItem("currencies")))
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
        this.currRatesAll = entries;
        console.log(entries, localStorage.getItem("currencies"));
        let storedCurr = JSON.parse(localStorage.getItem("currencies"));
        let favCurr = [];
        let normalCurr = [];
        entries.forEach(x=>{
          storedCurr.forEach(c=>{
            if (x[0] === c.code && c.isFav == 1){
              favCurr.push(x[0], x[1]);
            }
          });
        });
        this.currRatesAll = [favCurr, ...normalCurr]
        this.dismiss();
      }, (error: any) => {
        console.log(error);
    });
    
  }

  public rateDetail(rate){
    const curr = rate[0];
    localStorage.setItem("currCode", curr);
    this.router.navigate(['/tabs/tab2'])
  }
}
