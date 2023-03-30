import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {



  type:string = "password";
  istext:boolean = false;
  eyeIcon:string="fa-eye-slash";


  signupform!:FormGroup;
  /**
   *
   */
  constructor(private fb:FormBuilder,private auth: ApiService, private router:Router,private toast: NgToastService ) {}
  ngOnInit():void{
    this.signupform = this.fb.group(
      {
  
        FirstName:['',Validators.required],
        LastName:['',Validators.required],
        // UserName:['',Validators.required],
        Email:['',Validators.required],
        Password:['',Validators.required]
        // role:['',Validators.required]
       
      }
    )
  
    
  }


  hideshowpass(){
    this.istext=!this.istext;
    this.istext ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash";
    this.istext ? this.type="text": this.type="password";

}

onSignup(){
  if(this.signupform.valid){
    //send the obj to database
     console.log(this.signupform.value);

    this.auth.signup(this.signupform.value)
    .subscribe({
      next:(res)=>{  
      this.toast.info({detail:"Success Registered",summary:"You are registered",duration:7000})
       this.signupform.reset();
       this.router.navigate(['login']);
  },
      error:(err)=>{   
        alert(err && err.message)
       this.toast.error({detail:"Error",summary:"You are not registered",duration:5000})
       
  
  }
      });
    // console.log(this.signupform.value)
    

  }
  else{
    
    //throw the erroe using toaster and with required fields
   // calling the method her::
 
    this.validateallformfields(this.signupform);
   this.toast.warning({detail:"Warning",summary:"Miss something? ",duration:5000})
  }

}

private validateallformfields(formGroup: FormGroup<any>) {
  Object.keys(formGroup.controls).forEach(field=>{
    const control = formGroup.get(field);
    if(control instanceof FormControl){
      control.markAsDirty({onlySelf:true});
    }
    else if (control instanceof FormGroup){
      this.validateallformfields(control)
    }
  })
  
  
  }

}
