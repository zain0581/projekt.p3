
import { Component, OnInit,AfterViewInit,ViewChild  } from '@angular/core';
import { ApiService } from '../services/api.service';

import { MatPaginator } from '@angular/material/paginator';
import{ MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.css']
})
export class CryptoCurrencyComponent implements OnInit{

  dataSource! :  MatTableDataSource <CrytocurrencyData>;
   displayedColumns:string[]=['symbol','current_price','price_change_percentage_24h','market_cap']
   @ViewChild(MatPaginator) paginator!:MatPaginator;
   @ViewChild(MatSort) sort!:MatSort;
   constructor(private api:ApiService){}
   ngOnInit(): void {
     this.getAllData();
   }
   getAllData(){
     this.api.getCurrency("Dkk")
     .subscribe(res=>{console.log(res);
      this.dataSource =new MatTableDataSource<CrytocurrencyData>(res);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
      
  })
   
}
  applyFilter(event:Event)
  {
    const filterValue=(event.target as HTMLInputElement).value; this.dataSource.filter=filterValue.trim().toLowerCase();
     if(this.dataSource.paginator){
       this.dataSource.paginator.firstPage();
      }
    

    }
  }



export interface CrytocurrencyData{
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
 }

