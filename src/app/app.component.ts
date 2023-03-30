import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
//value in mat input default *USD*
  // selectedCurrency: string ="USD";

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private rout: Router){
  
  }
  getData() {
    return sessionStorage.getItem('Email');
  }
  //valuter skifter
  // sendCurrency(event:string){
  //   console.log(event);
  // }

  logout() {
    // Here you can remove the user data from the local variable and redirect to the login page
    //  this.loggedInUser = null;
    sessionStorage.clear();
    this.rout.navigate(['/coin-list']);
  }

}
