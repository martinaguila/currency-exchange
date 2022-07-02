import { Component } from '@angular/core';
import { ExchangeService } from '../../services/exchange.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private currCode;
  public currentRates;
  public tableHeader: Array<any> = ['Currency', 'Date 1 Rate', 'Date 2 Rate', 'Trend'];
  public date;
  public open: boolean = false;
  public date1;
  public currentRates2;

  constructor(
    private exchangeService: ExchangeService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit(){
    this.currCode = localStorage.getItem("currCode");
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

  public loadCurrentRates(currCode,date){
    // this.loader();
    this.exchangeService.historical1(currCode,date).subscribe(
      (res: any) => {
        let resultset: any = res;
        console.log(resultset)
        const entries = Object.entries(resultset.rates);
        this.currentRates = entries;
        // this.dismiss();
      }, (error: any) => {
        console.log(error);
    });
  }

  public getDate(e){
    this.date1 = e.detail.value;
    this.tableHeader[1] = this.date1 + " Rate";
    this.loadCurrentRates(this.currCode, this.date1);
  }
  
  public getDateCompare (e){
    this.tableHeader[2] = e.detail.value + " Rate";
    this.open = true;
    this.exchangeService.historical2(this.currCode,e.detail.value).subscribe(
      (res: any) => {
        let resultset: any = res;
        console.log(resultset)
        const entries = Object.entries(resultset.rates);
        entries.forEach(x=>{
          this.currentRates.forEach((c,index)=>{
            if (x[0] === c[0]){
              if (c[1] > x[1]){
                this.currentRates[index].push(x[1],'arrow-down-outline');
              } else if ((c[1] < x[1])){
                this.currentRates[index].push(x[1],'arrow-up-outline');
              } else{
                this.currentRates[index].push(x[1],'');
              }
            }
          });
        });
      }, (error: any) => {
        console.log(error);
    });
  }

  public toHome(){
    this.router.navigate(['/tabs/tab1'])
  }
}
