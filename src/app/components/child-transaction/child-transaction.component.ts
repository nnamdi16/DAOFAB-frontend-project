import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ChildTransaction } from './../../models/Transactions';
import { TransactionsService } from './../../services/transactions.service';

@Component({
  selector: 'app-child-transaction',
  templateUrl: './child-transaction.component.html',
  styleUrls: ['./child-transaction.component.css']
})
export class ChildTransactionComponent implements OnInit {
  dataSource = new MatTableDataSource<ChildTransaction>();
  displayedColumns:string[] =["id", "sender", "receiver","totalAmount", "paidAmount"];
  page:string="1"
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private transactionService: TransactionsService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchChildTransactionDetails(id);
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
  
  fetchChildTransactionDetails(id:string) {
    this.transactionService.fetchChildTransactionDetails(id).subscribe(childTransactionDetails => {
      const{data} = childTransactionDetails;
      this.dataSource = new MatTableDataSource<ChildTransaction>(data);
    })
  }

}
