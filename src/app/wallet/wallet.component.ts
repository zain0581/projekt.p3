import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import { AddWalletComponent } from '../add-wallet/add-wallet.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

  wallets:Wallet[]=[];

  constructor( private api :ApiService, private router : Router ,private _dialog:MatDialog,private toast:NgToastService )   { 
  }

  openAddEditwalletForm(){
    const dialogRef=this._dialog.open(AddWalletComponent);
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
  this.api. getWallets()
  .subscribe((data: Wallet[]) => {
    this.wallets = data;
       // assigning the fetched data to the coins array
    }, (error)=>{
      console.error('Error fetching wallets',error);
    }
    );
    
}

deleteWallet(id: number) {
  this.api.deleteWallet(id).subscribe({
    next: res => {
      this.toast.success({detail:"Success Message",summary:"Cion has been Deleted",duration:5000})
      // Reload the list of coins
      this.getalldata();
    },
    error: err => {
      console.log(err);
      alert('Error deleting coin'+err.message);
    }
  });

 }

 openEditWalletForm(wallet:Wallet)
   {
     const dialogRef=this._dialog.open(AddWalletComponent,{data:{
    id:wallet.id,
userId:wallet.userId,
balance:wallet.balance





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
 interface Wallet{
  id: number;
  userId: number;
  balance: number;
}

