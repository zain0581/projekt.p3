
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-coin',
  templateUrl: './add-coin.component.html',
  styleUrls: ['./add-coin.component.css']
})
export class AddCoinComponent {
  coinForm:FormGroup;


 constructor(private _fb:FormBuilder,private _apiService:ApiService,private _dialogRef:MatDialogRef <AddCoinComponent>,
  @Inject(MAT_DIALOG_DATA) private data:any){
   this.coinForm=this._fb.group({
   
    name: ['', Validators.required],
    symbol: ['', Validators.required],
    marketCap: ['', Validators.required],
    volume24h: ['', Validators.required],
    change24h: ['', Validators.required]

     
  });
}
ngOnInit():void{
  this.coinForm.patchValue(this.data);

}
  onFormSubmit() {
    
      if(this.coinForm.valid)
      {
      // console.log(this.coinForm.value);
      this._apiService.addCoin(this.coinForm.value).subscribe({
        next:(val:any) => {
          alert('Coins added successfuully');
          this._dialogRef.close(true);
        },
        error:(err:any)=>{
          console.error(err);
        }
      })

      }
    }
 

 }

 
  


 


