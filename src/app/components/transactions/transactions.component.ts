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
  pages:string[]=[];
  currentPage:number;
  totalPages:number;
  loading: boolean = true;
  paginationDetails: PaginationDetails;
  pageSize:number=2;
  transactionDetails:TransactionDetails[];
  sam:Transactions
  displayedColumns:string[] =["id", "sender", "receiver", "totalAmount", "paidAmount"];
  dataSource = new  MatTableDataSource<TransactionDetails>();
  page:string="1"
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  pagination(paginationResponse) {
    const{totalPages,currentPage} = paginationResponse;
    this.totalPages = totalPages;
    this.currentPage = currentPage;
    let pages:number[] = [];
    let pageValue = 1;
    for (let index = 0; index < totalPages; index++) {
      pages.push(pageValue);
      pageValue++;
    }
    console.log(pages.join().split(','));
    console.log(paginationResponse);
    this.pages = pages.join().split(',');
    return this.pages;
  }

  getTransactionDetails(page:string) {
    console.log('We are here');
    this.transactionsService.fetchTransactionDetails(page)
      .subscribe(transactionDetails =>{
        this.paginationDetails = transactionDetails.paginationResponse
        console.log(this.paginationDetails.totalItems);
        console.log(transactionDetails.data);
        this.dataSource = new MatTableDataSource<TransactionDetails>(transactionDetails.data);
        this.pagination(transactionDetails.paginationResponse);
        // this.dataSource = new MatTableDataSource<TransactionDetails>(transactionDetails.data);
        this.transactionDetails = transactionDetails.data;
        this.pageSize = transactionDetails.data.length;
        console.log(this.paginationDetails); 
        console.log(this.dataSource);
        console.log(this.transactionDetails);
        this.dataSource.paginator = this.paginator;
      })
  }

  pageChanged($event) {
    this.loading = true;
    console.log($event);
    return this.getTransactionDetails($event);
  }

  previousPagination() {
    console.log(this.currentPage);
    if(this.currentPage === 1) {
      return this.getTransactionDetails(this.currentPage.toString());
    }
    this.currentPage--;
    console.log(this.currentPage);
    return this.getTransactionDetails(this.currentPage.toString())

  }

  nextPagination() {
    console.log(this.currentPage);
    if(this.currentPage === this.totalPages) {
      return this.getTransactionDetails(this.currentPage.toString());
    }
    this.currentPage++;
    console.log(this.currentPage);
    return this.getTransactionDetails(this.currentPage.toString())

  }








}
