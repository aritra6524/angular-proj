import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

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
  queue: number;
}

@Component({
  selector: 'app-book-appointment-page',
  templateUrl: './book-appointment-page.component.html',
  styleUrls: ['./book-appointment-page.component.css'],
})
export class BookAppointmentPageComponent implements OnInit {
  constructor(
    private serviceObj: AppointmentService,
    private registerServiceObj: RegisterService,
    private router: Router
  ) {}

  selectedDoctor: Doctor = null;
  selectedPatient: Patient = null;
  appointment: Appointment = null;
  appointmentForm: FormGroup;

  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      appointmentDate: new FormControl(null)
    })

    this.getDate();

    this.appointmentForm = new FormGroup({
      date: new FormControl(null),
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
      },
    });
  }

  minDate:any = "";

  get appointmentDate(){
    return this.appointmentForm.get("associateName");
  }

  getDate() {
    var date = new Date();
    var toDate:any = date.getDate();
    if(toDate < 10) {
      toDate = "0" + toDate;
    }
    var month:any = date.getMonth()+1;
    if(month < 10){
      month = "0" + month;
    }
    var year:any = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate;
  }

  // checkInvalidDate() {
  //   if(this.minDate.getDay() === 0 || this.minDate.getDay() === 6){
  //     console.log("valid");
  //   }
  // }

  bookAppointment() {
    this.appointment = Object.assign({
      docfirstname: this.selectedDoctor.docfirstname,
      doclastname: this.selectedDoctor.doclastname,
      docregd: this.selectedDoctor.docregd,
      docspecialization: this.selectedDoctor.docspecialization,
      docqualification: this.selectedDoctor.docqualification,
      docphone: this.selectedDoctor.docphone,
      docemail: this.selectedDoctor.docemail,
      clinicname: this.selectedDoctor.clinicname,
      cliniccity: this.selectedDoctor.cliniccity,
      clinicaddress: this.selectedDoctor.clinicaddress,
      doctime: this.selectedDoctor.doctime,
      patfirstname: this.selectedPatient.patfirstname,
      patlastname: this.selectedPatient.patlastname,
      patemail: this.selectedPatient.patemail,
      patphone: this.selectedPatient.patphone,
      appointmentDate: this.appointmentForm.value.date,
    });

    this.serviceObj.setAppointment(this.appointment).subscribe({
      next: (data) => {},
      error: (error) => {
        console.error('Error booking appointment :', error);
      },
    });
    alert(
      'Appointment with Dr. ' +
        this.appointment.docfirstname +
        ' ' +
        this.appointment.doclastname +
        ' Booked Successfully'
    );
    this.router.navigate([
      `/dashboard/doctor-list/${this.appointment.patemail}`,
    ]);
  }
}
