import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private loginStatus: boolean = false;
  private loginCredentials: Patient = null;
  private profileStatus: string = '';

  constructor(private hC: HttpClient) {}

  loginStatusBS = new BehaviorSubject(this.loginStatus);
  loginCredentialsBS = new BehaviorSubject(this.loginCredentials);
  profilestatusBS = new BehaviorSubject(this.profileStatus);

  setLoginStatus(status) {
    return this.loginStatusBS.next(status);
  }

  setLoginCredential(credentials) {
    this.loginCredentials = credentials;
    this.loginCredentialsBS.next(credentials);
  }

  getLoginCredential() {
    return this.loginCredentialsBS.asObservable();
  }

  registerDoctor(docDetails: any) {
    return this.hC.post('http://localhost:3000/doctor', docDetails);
  }

  registerPatient(patDetails: any) {
    return this.hC.post('http://localhost:3000/patient', patDetails);
  }

  getuserCredPat(emailid) {
    return this.hC.get<Patient[]>(
      `http://localhost:3000/patient?patemail=${emailid}`
    );
  }

  getuserCredDoc(emailid) {
    return this.hC.get<Doctor[]>(
      `http://localhost:3000/doctor?docemail=${emailid}`
    );
  }
}

export interface Patient {
  patfirstname: string;
  patlastname: string;
  patphone: number;
  patemail: string;
  patpassword: string;
}

export interface Doctor {
  docfirstname: string;
  doclastname: string;
  docregd: number;
  docspecialization: string;
  docqualification: string;
  docphone: number;
  docemail: string;
  docpassword: string;
  clinicname: string;
  clinicaddress: string;
  doctime: string;
  mon: boolean;
  tues: boolean;
  wed: boolean;
  thurs: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}
