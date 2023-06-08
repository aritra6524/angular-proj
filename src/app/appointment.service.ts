import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private doctorDetails: Doctor = null;

  constructor(private hC: HttpClient) { }

  doctorDetailsBS = new BehaviorSubject(this.doctorDetails);

  setDoctorDetails(doctor) {
    // console.log("Setting Doctor: ");
    // console.log(doctor);
    return this.doctorDetailsBS.next(doctor);
  }

  getDoctorDetails() {
    return this.doctorDetailsBS.asObservable();
  }
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
  cliniccity: string;
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