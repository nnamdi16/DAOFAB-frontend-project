import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ChildTransaction, ChildTransactionDetails } from './../../models/Transactions';
import { TransactionsService } from './../../services/transactions.service';

@Component({
  selector: 'app-child-transaction',
  templateUrl: './child-transaction.component.html',
  styleUrls: ['./child-transaction.component.css']
})
export class ChildTransactionComponent implements OnInit {
  childTransactionDetails:ChildTransactionDetails;
  dataSource = new MatTableDataSource<ChildTransaction>();
  displayedColumns:string[] =["id" ,"parentId", "paidAmount"];
  page:string="1"
  
  constructor(private transactionService: TransactionsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchChildTransactionDetails(id);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  fetchChildTransactionDetails(id:string) {
    this.transactionService.fetchChildTransactionDetails(id).subscribe(childTransactionDetails => {
      this.childTransactionDetails = childTransactionDetails;
      this.dataSource = new MatTableDataSource<ChildTransaction>(childTransactionDetails.data);
    })
    return of(this.childTransactionDetails);
  }

}
