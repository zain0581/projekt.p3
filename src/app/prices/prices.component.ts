import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AddPriceComponent } from '../add-price/add-price.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent {

  prices:Price[]=[];
  
  constructor( private api :ApiService, private router : Router ,private _dialog:MatDialog,private toast:NgToastService)   { 
  }
  openAddEditcoinForm(){
      const dialogRef=this._dialog.open(AddPriceComponent);
      dialogRef.afterClosed().subscribe({
        next:(val)=>{
          if(val) {
            this.getalldata();
          }
        }
      })
  }

  getalldata() {
    this.api.getCrunnecy("USD")
    .subscribe((data: Price[]) => {
      this.prices = data;
         // assigning the fetched data to the coins array
      });
  }
}


interface Price {
  id:number;
  name: string;
  symbol: string;
 
}
