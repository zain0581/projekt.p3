import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService,  } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[] = []; // Initialize users as an empty array
  usersObservable: Observable<User[]> | undefined; // Create a separate variable for the observable

  constructor(
    private router: Router,
    private api: ApiService,
    private toast: NgToastService
  ) {}

  // Rest of the component code ...

  ngOnInit(): void {
    if (sessionStorage.getItem('Email')) {
      this.getalldata();
    } else {
      this.toast.error({ detail: 'error', summary: 'Please login First', duration: 5000 });
      this.router.navigate(['/login']);
    }
  }

  getalldata() {
  
    this.usersObservable = this.api.getUsersWithTransactionsAndWallets(); // Store the observable
    this.usersObservable.subscribe(
      (data: User[]) => {
        
        this.users = data; // Assign the data received in the subscription to users
      },
      (error: HttpErrorResponse) => {
        console.log('Error:', error);
        // Handle the error and display a message
        if (error.status === 405) {
          console.log('HTTP METHOD not found ');
        } else {
          console.log('An error occurred ');
        }
      }
    );
  }
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  transaction: Transaction[];
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
