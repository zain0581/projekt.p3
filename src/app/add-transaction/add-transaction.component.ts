
import { Component, Inject } from '@angular/core';

import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent {

  transactionForm: FormGroup;

  constructor(
    
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<AddTransactionComponent>,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.transactionForm = this._fb.group({
      id: [0, Validators.required],
      userId: ['', Validators.required],
      Date: ['', Validators.required]
    });
  }
  ngOnInit():void{
    this.transactionForm.patchValue(this.data);
  }

  saveTransaction() {



    if(this.transactionForm.valid)
      {
      // console.log(this.coinForm.value);
      this._apiService.createTransactions(this.transactionForm.value).subscribe({
        next:(val:any) => {
          alert('Transactions added successfuully');
          this._dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error(err);
          
        }
        
      })

      }
      else{
          
        //throw the erroe using toaster and with required fields
        //calling the method her::
         this.validateallformfields(this.transactionForm);
        this.toast.warning({detail:"WARNING",summary:"Miss Something? ",duration:5000})
     
      }
  }
  private validateallformfields(transactioForm: FormGroup<any>) {
    Object.keys(transactioForm.controls).forEach(field=>{
      const control = transactioForm.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }
      else if (control instanceof FormGroup){
        this.validateallformfields(control)
      }
    })
    
    
    }

}


