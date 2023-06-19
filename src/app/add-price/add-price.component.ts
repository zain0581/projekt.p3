import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.css']
})
export class AddPriceComponent {
  priceForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _dialogRef: MatDialogRef<AddPriceComponent>,
    private toast: NgToastService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.priceForm = this._fb.group({
      id: [0, Validators.required],
      coinId: ['', Validators.required],
      coinValue: ['', Validators.required]
    });
  }

  savePrice() {
    if (this.priceForm.valid) {
      const price = this.priceForm.value;
      // Call the API service to save the price
      this._apiService.createPrice(price).subscribe(
        () => {
          alert('coin added succ')
          this._dialogRef.close();
        },
        (error) => {
          alert('Failed to add price. Please try again')
          console.error(error);
        }
      );
    } else {
      alert('Please fill in all the required fields.')
     
    }
  }
}

