import { Component, OnInit,AfterViewInit,ViewChild  } from '@angular/core';
import { ApiService } from '../services/api.service';

import { MatPaginator } from '@angular/material/paginator';
import{ MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-cryptocurrency',
  templateUrl: './cryptocurrency.component.html',
  styleUrls: ['./cryptocurrency.component.css']
})
export class CryptocurrencyComponent implements OnInit {
   displayedColumns: string[]=['symbol','current_price','price_change_percentage_24h','market_cap']
   dataSource! :  MatTableDataSource <any>;
   @ViewChild(MatPaginator) paginator!:MatPaginator;
   @ViewChild(MatSort) sort!:MatSort;
   constructor(private api:ApiService){}
   ngOnInit(): void {
     this.getAllData();
   }
   getAllData(){
     this.api.getCurrency("Dkk")
     .subscribe(res=>{console.log(res);
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
   })
  }
  applyFilter(event:Event)
  {
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
