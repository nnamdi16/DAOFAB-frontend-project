import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionDetails } from './../../models/Transactions';
import { TransactionsService } from './../../services/transactions.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactionDetail: TransactionDetails[];
  displayedColumns:string[] =["id", "sender", "receiver", "totalAmount", "paidAmount"];
  dataSource: MatTableDataSource<TransactionDetails>
  page:string="2"
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionsService:TransactionsService) {}

  ngOnInit(): void {
    this.getTransactionDetails(); 
    
  }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getTransactionDetails() {
    console.log('We are here');
    this.transactionsService.fetchTransactionDetails(this.page)
      .subscribe(transactionDetails =>{
        this.dataSource = new MatTableDataSource(transactionDetails.data);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator
      })
  }

}
