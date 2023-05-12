import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AddCoinComponent } from '../add-coin/add-coin.component';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent  {
  coins:Coin[]=[];
  
  constructor( private api :ApiService, private toast : NgToastService, private router : Router ,private _dialog:MatDialog)   { 
  }
  openAddEditcoinForm(){
      const dialogRef=this._dialog.open(AddCoinComponent);
      dialogRef.afterClosed().subscribe({
        next:(val)=>{
          if(val) {
            this.getalldata();
          }
        }
      })
  }
  
  ngOnInit():void{
    // calling the uder methods to see  Arrays with data in aplictaion inspect 
    if (sessionStorage.getItem('Email')) {
      

      } else {

        this.toast.error({detail:"error",summary:"Please login First",duration:5000})
        this.router.navigate(['/login']);
       
      }
    this.getalldata();
    // this.getalldata();
      }


  getalldata() {
    this.api.getCrunnecy("USD")
    .subscribe((data: Coin[]) => {
      this.coins = data;
         // assigning the fetched data to the coins array
      });
  }
  deleteCoin(id: number) {
    this.api.deleteCoin(id).subscribe({
      next: res => {
        alert('Coin deleted');
        // Reload the list of coins
        this.getalldata();
      },
      error: err => {
        console.log(err);
        alert('Error deleting coin'+err.message);
      }
    });

   }
   openEditCoinForm(coin:Coin)
   {
     const dialogRef=this._dialog.open(AddCoinComponent,{data:{coin}});
   
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getalldata();
        }
      }
    });
   }
  
  }

interface Coin {
  id:number;
  name: string;
  symbol: string;
  marketCap: number;
  volume24h: number;
  change24h: number;
}
