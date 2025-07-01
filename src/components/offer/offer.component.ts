import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  offerForm: FormGroup;
  resultMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.offerForm = this.fb.group({
      offerId: [''],
      action: ['accept']
    });
  }

  submitForm() {
    const { offerId, action } = this.offerForm.value;
    this.http.patch(`/api/offers/${offerId}/status`, { status: action })
      .subscribe({
        next: () => {
          this.resultMessage = `Offer ${offerId} has been ${action}ed.`;
        },
        error: () => {
          this.resultMessage = 'Failed to update offer status.';
        }
      });
  }
}
