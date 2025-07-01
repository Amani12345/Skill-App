import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  userTypes = ['User', 'Provider'];
  selectedUserType = 'User';
  submitted = false;
  successMessage = '';
  constructor(private fb: FormBuilder,  private apiService: ApiService) {
    this.signupForm = this.fb.group({
      userType: ['User', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      streetNumber: ['', Validators.required],
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postCode: ['', Validators.required],
      companyName: [''],
      phoneNumber: [''],
      businessTaxNumber: [''],
      representativeFullName: [''],
    });


    this.signupForm.get('userType')?.valueChanges.subscribe((value) => {
      this.selectedUserType = value;
      this.updateValidators();
    });
  }

  updateValidators() {
    if (this.selectedUserType === 'Provider') {
      this.signupForm.get('companyName')?.setValidators(Validators.required);
      this.signupForm.get('businessTaxNumber')?.setValidators([
        Validators.required, Validators.pattern(/^[A-Z0-9]{10}$/),
      ]);
      this.signupForm.get('representativeFullName')?.setValidators(
        Validators.required
      );
    } else {
      this.signupForm.get('companyName')?.clearValidators();
      this.signupForm.get('businessTaxNumber')?.clearValidators();
      this.signupForm.get('representativeFullName')?.clearValidators();
    }
    this.signupForm.get('companyName')?.updateValueAndValidity();
    this.signupForm.get('businessTaxNumber')?.updateValueAndValidity();
    this.signupForm.get('representativeFullName')?.updateValueAndValidity();
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) return;

    const userData = {
      fullName: `${this.signupForm.value.firstName} ${this.signupForm.value.lastName}`,
      email: this.signupForm.value.email,
      mobile: this.signupForm.value.mobile,
      address: {
        street: this.signupForm.value.street,
        city: this.signupForm.value.city,
        state: this.signupForm.value.state,
        postcode: this.signupForm.value.postcode
      }
    };

    this.apiService.createUser(userData).subscribe({
      next: () => {
        this.successMessage = 'User registered successfully!';
        this.signupForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error('Signup error', err);
        this.successMessage = 'Signup failed.';
      }
    });
  }
}
