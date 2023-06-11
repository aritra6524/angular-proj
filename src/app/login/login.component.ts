import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginPatForm: FormGroup;
  loginDocForm: FormGroup;
  loginAdminForm: FormGroup;
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
    this.loginAdminForm = new FormGroup({
      adminemail: new FormControl(null),
      adminpassword: new FormControl(null),
    });
  }

  setProfile(profile: string): void {
    this.profileType = profile;
  }

  onPatLogin() {
    const patientCredObj = this.loginPatForm.value;
    this.serviceObj.getuserCredPat(patientCredObj.patemail).subscribe({
      next: (response) => {
        if (response.length != 0) {
          if (patientCredObj.patpassword == response[0].patpassword) {
            //update global state
            this.serviceObj.setPatientLoginStatus(true);
            this.serviceObj.setCurrentPatient(response[0]);
            //navigate to dashboard
            this.router.navigate([
              '/dashboard/doctor-list',
              patientCredObj.patemail,
            ]);
          } else {
            alert('Invalid Password');
          }
        } else {
          alert('Invalid! Patient Not Found');
        }
      },
      error: (err) => {
        console.log('Error occurred:', err);
      },
    });
  }

  onDocLogin(): void {
    const doctorCredObj = this.loginDocForm.value;
    this.serviceObj.getuserCredDoc(doctorCredObj.docemail).subscribe({
      next: (response) => {
        if (response.length != 0) {
          if (doctorCredObj.docpassword == response[0].docpassword) {
            //update global state
            this.serviceObj.setDoctorLoginStatus(true);
            this.serviceObj.setCurrentDoctor(response[0]);
            //navigate to dashboard
            this.router.navigate([
              '/dashboard/patient-list',
              doctorCredObj.docemail,
            ]);
          } else {
            alert('Invalid Password');
          }
        } else {
          alert('Invalid! Doctor Not Found');
        }
      },
      error: (err) => {
        console.log('Error occurred:', err);
      },
    });
  }

  onAdminLogin(): void {
    const adminCredObj = this.loginAdminForm.value;
    // console.log(adminCredObj);
    this.serviceObj.getuserCredAdmin(adminCredObj.adminemail).subscribe({
      next: (response) => {
        if (response.length != 0) {
          if (adminCredObj.adminpassword == response[0].adminpassword) {
            //update global state
            this.serviceObj.setAdminLoginStatus(true);
            //navigate to dashboard
            this.router.navigate(['/dashboard']);
          } else {
            alert('Invalid Password');
          }
        } else {
          alert('Invalid Username');
        }
      },
      error: (err) => {
        console.log('Error occurred:', err);
      },
    });
  }
}
