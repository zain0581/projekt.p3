import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor( private router :Router, private toast :NgToastService) {

    
  }
  canActivate():boolean{
   
    if (sessionStorage.getItem('Email')) {
      return true;

      } else {

        this.toast.error({detail:"error",summary:"Please login First",duration:5000})
        this.router.navigate(['/login']);
        return false;
      }
 
  }
  
}
