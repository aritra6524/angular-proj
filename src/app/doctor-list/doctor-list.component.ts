import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { RegisterService } from '../register.service';
import { FormGroup } from '@angular/forms';

interface Doctor {
  docfirstname: string;
  doclastname: string;
  docregd: string;
  docspecialization: string;
  docqualification: string;
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

interface Appointment {
  docfirstname: string;
  doclastname: string;
  docregd: string;
  docspecialization: string;
  docqualification: string;
  clinicname: string;
  cliniccity: string;
  clinicaddress: string;
  doctime: string;
  appointmentDate: string;
}

interface Patient {
  emailid: string;
}

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
})
export class DoctorListComponent implements OnInit {
  docForm: FormGroup;

  doctors: Doctor[] = [];
  appointments: Appointment[] = [];
  patient: Patient;

  constructor(
    private hC: HttpClient,
    private router: Router,
    private serviceObj: AppointmentService,
    private registerServiceObj: RegisterService
  ) {}

  ngOnInit() {
    this.fetchDoctors();
    // this.fetchAppointments(patient);
  }

  fetchDoctors() {
    this.hC.get<Doctor[]>('http://localhost:3000/doctor').subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  toAppointmentPage(doctor) {
    this.serviceObj.setDoctorDetails(doctor);
    this.router.navigate(['/dashboard/book-appointment-page']);
  }

  // fetchAppointments(patient) {
  //   console.log(this.registerServiceObj.getuserCredPat(patient.patemail));
  // this.hC
  //   .get<Appointment[]>(
  //     `http://localhost:3000/appointment?patemail=${patient.patemail}`
  //   )
  //   .subscribe(
  //     (data) => {
  //       this.appointments = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching appointments:', error);
  //     }
  //   );
  // }
}
