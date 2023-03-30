import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent  {
  constructor( private api :ApiService, private toast : NgToastService, private router : Router)   { 
  }
  coins :any =[];
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
  }
  


interface Coin {
  name: string;
  symbol: string;
  marketCap: number;
  volume24h: number;
  change24h: number;
}
