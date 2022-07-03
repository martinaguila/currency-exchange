import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(public http: HttpClient) { }

  currencies(){
    const httpHeaders: HttpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
    return this.http.get('https://openexchangerates.org/api/currencies.json',{ headers: httpHeaders }).pipe(map(res => res));
    // return this.http.get('../data/currencies.json',{ headers: httpHeaders }).pipe(map(res => res));
  }

  exchange(baseCurr){
    // limit only to 100 per month
    // const httpHeaders: HttpHeaders = new HttpHeaders()
    //   .set("Content-Type", "application/json")
    //   .set("apiKey","IdRLPEbigZ8yLBM0doQMZzPVdo1R1KCy")
    // return this.http.get(`https://api.apilayer.com/fixer/latest?base=${baseCurr.detail.value}&symbols=EUR,GBP`,{ headers: httpHeaders }).pipe(map(res => res));
    
    // no params for free subscription
    // const httpHeaders: HttpHeaders = new HttpHeaders()
    //   .set("Content-Type", "application/json")
    // return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=6ac2d6e4a3174fc49bd7ee80f20d8a50`,{ headers: httpHeaders }).pipe(map(res => res));
    
    const httpHeaders: HttpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set('X-RapidAPI-Key', '60b0e5d27emsh30f02830e3bf27ap18da2djsneaea909cabe1')
      .set('X-RapidAPI-Host', 'currency-conversion-and-exchange-rates.p.rapidapi.com')
      return this.http.get(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=${baseCurr}`,{ headers: httpHeaders }).pipe(map(res => res));
    }

  exchangeCustomized(baseCurr, toCurr){
    let currArr = [];
    toCurr.detail.value.forEach(currency=>{
      currArr.push(currency);
    });
    const httpHeaders: HttpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set('X-RapidAPI-Key', '60b0e5d27emsh30f02830e3bf27ap18da2djsneaea909cabe1')
      .set('X-RapidAPI-Host', 'currency-conversion-and-exchange-rates.p.rapidapi.com')
    return this.http.get(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=${baseCurr}&to=${currArr.toString()}`,{ headers: httpHeaders }).pipe(map(res => res));
  }

  historical1(baseCurr, date){
    const httpHeaders: HttpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set('X-RapidAPI-Key', '60b0e5d27emsh30f02830e3bf27ap18da2djsneaea909cabe1')
      .set('X-RapidAPI-Host', 'currency-conversion-and-exchange-rates.p.rapidapi.com')
    return this.http.get(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/${date}`,{ headers: httpHeaders }).pipe(map(res => res));
  }

  historical2(baseCurr, date){
    const httpHeaders: HttpHeaders = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set('X-RapidAPI-Key', '60b0e5d27emsh30f02830e3bf27ap18da2djsneaea909cabe1')
      .set('X-RapidAPI-Host', 'currency-conversion-and-exchange-rates.p.rapidapi.com')
    return this.http.get(`https://currency-conversion-and-exchange-rates.p.rapidapi.com/${date}`,{ headers: httpHeaders }).pipe(map(res => res));
  }
}
