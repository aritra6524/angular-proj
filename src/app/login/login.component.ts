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
      pattpassword: new FormControl(null)
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
    this.loginObj.getuserCredPat(this.loginPatForm.value).subscribe({
      next:(value)=>{
        if(value[0].patpassword===this.loginPatForm.value.pattpassword){
          console.log("Logged in successfully");
          this.router.navigate (['/patient-dashboard']);
        }
      },
      error:(err)=>{
        
      },
    })
  }

  onDocLogin(): void {
    this.loginObj.getuserCredPat(this.loginPatForm.value).subscribe({
      next:(value)=>{
        if(value[0].patpassword==this.loginPatForm.value.patpassword){
          
        }
      },
      error:(err)=>{
        
      },
    })
  }
}
