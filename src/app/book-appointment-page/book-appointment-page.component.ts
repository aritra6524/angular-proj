import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { RegisterService } from '../register.service';

interface Doctor {
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

interface Patient {
  patfirstname: string;
  patlastname: string;
  patemail: string;
  patphone: number;
}

interface Appointment {
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
  patfirstname: string;
  patlastname: string;
  patemail: string;
  patphone: number;
  appointmentDate: string;
}

@Component({
  selector: 'app-book-appointment-page',
  templateUrl: './book-appointment-page.component.html',
  styleUrls: ['./book-appointment-page.component.css'],
})

export class BookAppointmentPageComponent implements OnInit {
  constructor(
    
    private serviceObj: AppointmentService,
    private registerServiceObj: RegisterService
  ) {}

  selectedDoctor: Doctor = null;
  selectedPatient: Patient = null;
  appointment: Appointment = null;
  appointmentForm: FormGroup;

  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      date: new FormControl(null)
    });

    this.serviceObj.getDoctorDetails().subscribe({
      next: (data) => {
        this.selectedDoctor = data;
      },
      error: (error) => {
        console.error('Error fetching doctors:', error);
      },
    });
    this.registerServiceObj.getCurrentPatient().subscribe({
      next: (data) => {
        this.selectedPatient = data;
        
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
      }
    });
  }

  bookAppointment(){
    // console.log(this.appointmentForm.value.date);
    // this.appointment = Object.assign({}, this.selectedDoctor, this.selectedPatient, {appointmentDate:this.appointmentForm.value.date });
    // console.log("this.appointment");
    this.appointment = Object.assign({}, this.selectedDoctor, this.selectedPatient, {appointmentDate:this.appointmentForm.value.date });
    this.serviceObj.setAppointment(this.appointment).subscribe({
      next: (data) => {
        
      },
      error: (error) => {
        console.error('Error booking appointment :', error);
      },
    });
  }
}
