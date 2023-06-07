import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginPatForm: FormGroup;
  loginDocForm: FormGroup;
  status: boolean;
  profileType: string = '';

  constructor(private loginObj: RegisterService, private router: Router){}

  ngOnInit(): void{
    this.loginPatForm = new FormGroup({
      patemail: new FormControl(null),
      patpassword: new FormControl(null)
    });
    this.loginDocForm = new FormGroup({
      docemail: new FormControl(null),
      docpassword: new FormControl(null)
    });
  }

  setProfile(profile: string): void {
    this.profileType = profile;
  }

  onPatLogin(): void {
    console.log(this.loginPatForm.value.patpassword);
    this.loginObj.getuserCredPat(this.loginPatForm.value).subscribe({
      next: (value) => {
        console.log("Value:", value);
        console.log("Type of value[0].patpassword:", typeof value[0].patpassword);
        console.log("Type of this.loginPatForm.value.patpassword:", typeof this.loginPatForm.value.patpassword);
  
        if (value && value.length > 0 && value[0].patpassword === this.loginPatForm.value.patpassword) {
          console.log("Logged in successfully");
          this.router.navigate(['/patient-dashboard']);
        } else {
          console.log("Invalid credentials");
        }
      },
      error: (err) => {
        console.log("Error occurred:", err);
      }
    });
  }
  
  

  onDocLogin(): void {
    this.loginObj.getuserCredDoc(this.loginDocForm.value).subscribe({
      next: (value) => {
        if (value[0].docpassword === this.loginDocForm.value.docpassword) {
          console.log("Logged in successfully");
          this.router.navigate(['/doctor-dashboard']);
        }
      },
      error: (err) => {
        
      },
    })
  }
}