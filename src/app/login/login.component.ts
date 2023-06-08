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

  constructor(private serviceObj: RegisterService, private router: Router){}

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

  onPatLogin() {
    const formDetails=this.loginPatForm.value;
    this.serviceObj.getuserCredPat(formDetails.patemail).subscribe({
      next: (response) => {
        if(response.length!=0){
          if(formDetails.patpassword == response[0].patpassword){
            this.serviceObj.setLoginStatus(true);
            this.serviceObj.setLoginCredential('patient');
            this.router.navigate(['/patient-dashboard']);
          }
          else {
            alert('Invalid Password');
          }
        }
      },
      error: (err) => {
        console.log("Error occurred:", err);
      }
    });
  }
  
  

  onDocLogin(): void {
    this.serviceObj.getuserCredDoc(this.loginDocForm.value).subscribe({
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