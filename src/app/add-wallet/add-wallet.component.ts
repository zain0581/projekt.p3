import { Component,Inject } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';



@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.css']
})
export class AddWalletComponent {

  walletForm: FormGroup;

  constructor(
    
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<AddWalletComponent>,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.walletForm = this._fb.group({
      id: [0, Validators.required],
      userId: ['', Validators.required],
      balance: ['', Validators.required]
    });
  }
  ngOnInit():void{
    this.walletForm.patchValue(this.data);
  }

  saveWallet() {



    if(this.walletForm.valid)
      {
      // console.log(this.coinForm.value);
      this._apiService. createWallet(this.walletForm.value).subscribe({
        next:(val:any) => {
          alert('wallet added successfuully');
          this._dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error('Error creating wallet:',err);
         
          
        }
        
      })

      }
      else{
          
        //throw the erroe using toaster and with required fields
        //calling the method her::
         this.validateallformfields(this.walletForm);
        this.toast.warning({detail:"WARNING",summary:"Miss Something? ",duration:5000})
     
      }
  }
  private validateallformfields(walletForm: FormGroup<any>) {
    Object.keys(walletForm.controls).forEach(field=>{
      const control = walletForm.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if (control instanceof FormGroup){
        this.validateallformfields(control)
      }
    })
    
    
    }

}
