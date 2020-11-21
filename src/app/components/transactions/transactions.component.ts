import { Component, OnInit, ViewChild } from '@angular/core';
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
  pages:string[]=[];
  currentPage:number;
  totalPages:number;
  loading: boolean = true;
  displayedColumns:string[] =["id", "sender", "receiver", "totalAmount", "paidAmount"];
  dataSource = new  MatTableDataSource<TransactionDetails>();
  page:string="1"
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionsService:TransactionsService) {}

  ngOnInit(): void {
    this.getTransactionDetails(this.page); 
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
    this.pages = pages.join().split(',');
    return this.pages;
  }

  getTransactionDetails(page:string) {
    this.transactionsService.fetchTransactionDetails(page)
      .subscribe(transactionDetails =>{
        this.dataSource = new MatTableDataSource<TransactionDetails>(transactionDetails.data);
        this.pagination(transactionDetails.paginationResponse);
      })
  }

  pageChanged($event) {
    this.loading = true;
    return this.getTransactionDetails($event);
  }

  previousPagination() {
    if(this.currentPage === 1) {
      return this.getTransactionDetails(this.currentPage.toString());
    }
    this.currentPage--;
    return this.getTransactionDetails(this.currentPage.toString())

  }

  nextPagination() {
    if(this.currentPage === this.totalPages) {
      return this.getTransactionDetails(this.currentPage.toString());
    }
    this.currentPage++;
    return this.getTransactionDetails(this.currentPage.toString())

  }








}
