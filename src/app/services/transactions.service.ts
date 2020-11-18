import { Transactions } from './../models/Transactions';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type':'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  transactionDetailsUrl:string=`http://localhost:3000/transactionDetails/`

  constructor(private http:HttpClient) { }

  fetchTransactionDetails(page:string): Observable<Transactions>{
    let params = new  HttpParams().set('page',page);
    console.log('We are here')
    const result= this.http.get<Transactions>(this.transactionDetailsUrl,{params});
    console.log(result);
    return result;

  }
}
