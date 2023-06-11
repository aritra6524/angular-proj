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

  adminLoginStatus: boolean = false;

  patientLoginStatus: boolean = false;
  currentPatient: Patient = null;

  doctorLoginStatus: boolean = false;
  currentDoctor: Doctor = null;

  adminLoginStatusBehaviorSubject = new BehaviorSubject(this.adminLoginStatus);
  patientLoginStatusBehaviorSubject = new BehaviorSubject(
    this.patientLoginStatus
  );
  currentPatientBehaviorSubject = new BehaviorSubject(this.currentPatient);

  doctorLoginStatusBehaviorSubject = new BehaviorSubject(
    this.doctorLoginStatus
  );
  currentDoctorBehaviorSubject = new BehaviorSubject(this.currentDoctor);

  //update Admin Login status
  setAdminLoginStatus(status) {
    this.adminLoginStatusBehaviorSubject.next(status);
  }

  //get Admin Login Status
  getAdminLoginStatus() {
    return this.adminLoginStatusBehaviorSubject.asObservable();
  }

  //update Login status
  setDoctorLoginStatus(status) {
    this.doctorLoginStatusBehaviorSubject.next(status);
  }

  //get Login status
  getDoctorLoginStatus() {
    return this.doctorLoginStatusBehaviorSubject.asObservable();
  }

  //update current user
  setCurrentDoctor(userObj) {
    return this.currentDoctorBehaviorSubject.next(userObj);
  }

  //get current user
  getCurrentDoctor() {
    return this.currentDoctorBehaviorSubject.asObservable();
  }

  //update Login status
  setPatientLoginStatus(status) {
    this.patientLoginStatusBehaviorSubject.next(status);
  }

  //get Login status
  getPatientLoginStatus() {
    return this.patientLoginStatusBehaviorSubject.asObservable();
  }

  //update current user
  setCurrentPatient(userObj) {
    this.currentPatientBehaviorSubject.next(userObj);
  }

  //get current user
  getCurrentPatient() {
    return this.currentPatientBehaviorSubject.asObservable();
  }

  // loginStatusBS = new BehaviorSubject(this.loginStatus);
  // loginCredentialsBS = new BehaviorSubject(this.loginCredentials);
  // profilestatusBS = new BehaviorSubject(this.profileStatus);

  // setLoginStatus(status) {
  //   return this.loginStatusBS.next(status);
  // }

  // setLoginCredential(credentials) {
  //   this.loginCredentials = credentials;
  //   this.loginCredentialsBS.next(credentials);
  // }

  // getLoginCredential() {
  //   return this.loginCredentialsBS.asObservable();
  // }

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

  getuserCredAdmin(emailid) {
    return this.hC.get<Admin[]>(
      `http://localhost:3000/admin?adminemail=${emailid}`
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
  cliniccity: string;
  doctime: string;
  mon: boolean;
  tues: boolean;
  wed: boolean;
  thurs: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}

export interface Admin {
  adminemail: string;
  adminpassword: string;
}
