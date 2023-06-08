import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginPatForm: FormGroup;
  loginDocForm: FormGroup;
  status: boolean;
  profileType: string = 'Patient';

  constructor(private serviceObj: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.loginPatForm = new FormGroup({
      patemail: new FormControl(null),
      patpassword: new FormControl(null),
    });
    this.loginDocForm = new FormGroup({
      docemail: new FormControl(null),
      docpassword: new FormControl(null),
    });
  }

  setProfile(profile: string): void {
    this.profileType = profile;
  }

  onPatLogin() {
    const formDetails = this.loginPatForm.value;
    this.serviceObj.getuserCredPat(formDetails.patemail).subscribe({
      next: (response) => {
        if (response.length != 0) {
          if (formDetails.patpassword == response[0].patpassword) {
            //Set the logged-in username as state
            const navigationExtras: NavigationExtras = {
              state: {
                username: response[0].patemail,
                firtname: response[0].patfirstname,
                lastname: response[0].patlastname,
              },
            };

            this.serviceObj.setLoginStatus(true);
            this.serviceObj.setLoginCredential(response[0]);
            this.router.navigate(['/dashboard/doctor-list'], navigationExtras);
          } else {
            alert('Invalid Password');
          }
        }
      },
      error: (err) => {
        console.log('Error occurred:', err);
      },
    });
  }

  onDocLogin(): void {
    const formDetails = this.loginDocForm.value;
    this.serviceObj.getuserCredDoc(formDetails.docemail).subscribe({
      next: (response) => {
        if (response.length != 0) {
          if (formDetails.docpassword == response[0].docpassword) {
            this.serviceObj.setLoginStatus(true);
            this.serviceObj.setLoginCredential('doctor');
            this.router.navigate(['/dashboard']);
          } else {
            alert('Invalid Password');
          }
        }
      },
      error: (err) => {
        console.log('Error occurred:', err);
      },
    });
  }
}
