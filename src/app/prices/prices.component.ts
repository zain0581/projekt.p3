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
 
  openAddEditpriceForm(){
      const dialogRef=this._dialog.open(AddPriceComponent);
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
     this.getalldata();
      }



  getalldata() {
    this.api.getPrices()
    .subscribe((data: Price[]) => {
      this.prices = data;
         // assigning the fetched data to the coins array
      });
      
  }

  deletePrice(id:number )
  {
    this.api.deletePrice(id).subscribe({
      next:res=>{
        this.toast.success({detail:"Success Message ",summary:"price has been deleted ",duration:5000})
        //Reload the list of prices 
        this.getalldata();
      },
      error:err=>{
        console.log (err);
        alert('Error deleting price '+err.message)
      }
    });
   
  }
  openEditPriceForm(price:Price)
   {
     const dialogRef=this._dialog.open(AddPriceComponent,{data:{
      id:price.id,
coinId:price.coinId,
value:price.value,





     }});

     dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getalldata();
        }
      }
    });
   }
}


  export interface Price {
    id: number;
    coinId: number;
    value: number;
  }




 
