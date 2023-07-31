import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  {
  users:User[]=[]; //Use definite assignment assertion modifier (!)
  
     constructor( private router: Router,http :HttpClient, private api:ApiService,private toast:NgToastService){}
    
// Getting data from for login (Session storage)
  getData() {
    //return sessionStorage.getItem('firstName');
    // const Email = sessionStorage.getItem('Email')
    
    // this.toster.success({detail:"Login",summary:"good",duration:50000})
     const firstName =  sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    return firstName + '    ' + lastName  ;
  // return sessionStorage.getItem('Email');

  }
  // ngOnInit() {
  //   const userId = 1; // Replace with the actual user ID

  //   this.api.getuser(userId).subscribe(
  //     (userdata:any) => {
  //       this.loggedInuser =userdata.user;
  //       this.transactions = userdata.transactions;
  //       this.wallet = userdata.wallet;
       
  //     },
  //     (error:any) => {
  //       console.log('Error:', error);
  //     }
  //   );
  //   this.getalldata();
  // }
  // getalldata() {
  //   this.api.getuserwithTransactionsandwallets().subscribe((data:User[]) => {
  //     this.loggedInuser = data[0];//Assuming its receviing an array of users and taking the first user 
  //     // Assigning the fetched data to the coins array
  //     this.transactions=this.loggedInuser.transactions;
  //     this.wallet=this.loggedInuser.wallets;
  //   });
      
  // }
  
  ngOnInit():void{
    // calling the uder methods to see  Arrays with data in aplictaion inspect 
    if (sessionStorage.getItem('Email')) {
      this.getalldata();

      } else {

         this.toast.error({detail:"error",summary:"Please login First",duration:5000})
        this.router.navigate(['/login']);
       
      }
      }



  getalldata() {
   
    this.api. getUsersWithTransactionsAndWallets()
    .subscribe((data: User[]) => {
      this.users = data;
    },( error:HttpErrorResponse)=>{
      console.log('Error:',error);
      //Handle the error and display a message 
      if(error.status===405)
      {
        console.log('HTTP METHOD not found ');

      } else {
        console.log('An error occured ');
      }
      
    }
         // assigning the fetched data to the coins array
      );
      
  }


  
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  transactions: Transaction[];
  wallets: Wallet[];
}

export interface Transaction {
  id: number;
  date: string;
}

export interface Wallet {
  id: number;
  balance: number;
}
