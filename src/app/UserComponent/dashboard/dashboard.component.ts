import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    
  
     constructor( private router: Router){}
    
   

  
  
   


// Getting data from for login (Session storage)
  getData() {
    //return sessionStorage.getItem('firstName');
    // const Email = sessionStorage.getItem('Email')
     const firstName =  sessionStorage.getItem('firstName');
    const lastName = sessionStorage.getItem('lastName');
    return firstName + '    ' + lastName  ;
  // return sessionStorage.getItem('Email');

  }

  
}
