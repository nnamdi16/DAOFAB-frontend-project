import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChildTransactionDetails, Transactions } from './../models/Transactions';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type':'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  transactionDetailsUrl:string=`http://localhost:3000/transactionDetails/`;
  childTransactionDetailsUrl:string=`http://localhost:3000/childTransactionsByParentId/`;

  constructor(private http:HttpClient) { }

  fetchTransactionDetails(page:string): Observable<Transactions>{
    let params = new  HttpParams().set('page',page);
    const result= this.http.get<Transactions>(this.transactionDetailsUrl,{params});
    console.log(result);
    return result;

  }

  fetchChildTransactionDetails(id:string):Observable<ChildTransactionDetails>{
    console.log('We are here');
    let params = new HttpParams().set('id',id);
    const result = this.http.get<ChildTransactionDetails>(this.childTransactionDetailsUrl,{params});
    console.log(result);
    return result;
  }
}
