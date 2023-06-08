import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService{

  constructor(private hC: HttpClient) { }

  registerDoctor(docDetails:any){
    return this.hC.post('http://localhost:3000/doctor', docDetails);
  }

  registerPatient(patDetails:any){
    return this.hC.post('http://localhost:3000/patient', patDetails);
  }

  getuserCredPat(emailid){
    return this.hC.get<Patient[]>(`http://localhost:3000/patient?patemail=${emailid}`);
  }

  getuserCredDoc(emailid){
    return this.hC.get<Doctor[]>(`http://localhost:3000/doctor?docemail=${emailid}`);
  }
}

export interface Patient{
    patfirstname: string,
    patlastname: string,
    patphone: number,
    patemail: string,
    patpassword: string,
}

export interface Doctor{
    docfirstname: string,
    doclastname: string,
    docregd: number,
    docspecialization: string,
    docqualification: string,
    docphone: number,
    docemail: string,
    docpassword: string,
    clinicname: string,
    clinicaddress: string,
    doctime: string,
    mon: boolean,
    tues: boolean,
    wed: boolean,
    thurs: boolean,
    fri: boolean,
    sat: boolean,
    sun: boolean
}