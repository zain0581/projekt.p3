import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import {AddTransactionComponent} from '../add-transaction/add-transaction.component'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

 

    transactions:Transaction[]=[];
    
    constructor( private api :ApiService, private router : Router ,private _dialog:MatDialog,private toast:NgToastService)   { 
    }
   
    openAddEdittransactionForm(){
        const dialogRef=this._dialog.open(AddTransactionComponent);
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
      this.api. getTransactions()
      .subscribe((data: Transaction[]) => {
        this.transactions = data;
           // assigning the fetched data to the coins array
        });
        
    }

    deleteTransaction(id: number)
    {
      this.api.deleteTransactions(id).subscribe({
        next: res => {
          this.toast.success({detail:"Success Message",summary:"Transactions has been Deleted",duration:5000})
          // Reload the list of coins
          this.getalldata();
        },
        error: err => {
          console.log(err);
          alert('Error deleting coin'+err.message);
        }
      });
    


    }

    openEditTransactionForm(transaction:Transaction)
   {
     const dialogRef=this._dialog.open(AddTransactionComponent,{data:{
      id:transaction.id,
       userId:transaction.userId,
       date:transaction.date





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

  
    export interface Transaction {
      id: number;
      userId: number;
      date: string;
    }
  
  


