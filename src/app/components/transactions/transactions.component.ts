import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationDetails, TransactionDetails, Transactions } from './../../models/Transactions';
import { TransactionsService } from './../../services/transactions.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  loading: boolean = true;
  paginationDetails: PaginationDetails;
  pageSize:number=2;
  transactionDetails:TransactionDetails[];
  sam:Transactions
  displayedColumns:string[] =["id", "sender", "receiver", "totalAmount", "paidAmount"];
  // dataSource:  MatTableDataSource<TransactionDetails>;
  dataSource = new  MatTableDataSource<any>();
  page:number=1
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatPaginator) 
  // set paginator(value: MatPaginator) {
  //   this.dataSource.paginator = value;
  // }
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionsService:TransactionsService) {}

  ngOnInit(): void {
    this.getTransactionDetails(this.page); 
    this.paginationDetails = new PaginationDetails();
    this.sam = new Transactions();
    console.log(this.sam);
    console.log(this.paginationDetails);

    
  }

    /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getTransactionDetails(page:number) {
    console.log('We are here');
    this.transactionsService.fetchTransactionDetails(page.toString())
      .subscribe(transactionDetails =>{
        this.paginationDetails = transactionDetails.paginationResponse
        console.log(transactionDetails.data);
        this.dataSource = new MatTableDataSource<any>(transactionDetails.data);
        // this.dataSource = new MatTableDataSource<TransactionDetails>(transactionDetails.data);
        this.transactionDetails = transactionDetails.data;
        this.pageSize = transactionDetails.data.length;
        console.log(this.paginationDetails.totalItems);
        console.log(this.dataSource);
        console.log(this.transactionDetails);
        this.dataSource.paginator = this.paginator;
      })
  }

  pageChanged(event) {
    this.loading = true;

    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    console.log(pageIndex,pageSize);
    this.getTransactionDetails(pageIndex+1);
  }

  onRowClicked(row) {
    console.log('Row clicked', row)
  }

}
