import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { RegisterService } from '../register.service';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

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
  patfirstname: string;
  patlastname: string;
  patphone: number;
  patemail: string;
  appointmentDate: string;
}

interface Result {
  docfirstname: string;
  doclastname: string;
  docregd: string;
  docspecialization: string;
  docqualification: string;
  clinicname: string;
  cliniccity: string;
  clinicaddress: string;
  doctime: string;
  patfirstname: string;
  patlastname: string;
  patphone: number;
  patemail: string;
  appointmentDate: string;
}

interface Patient {
  patfirstname: string;
  patlastname: string;
  patphone: number;
  patemail: string;
}

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
})
export class DoctorListComponent implements OnInit {
  docForm: FormGroup;

  selectedPatient: Patient;
  doctors: Doctor[] = [];
  appointments: Appointment[] = [];
  results: Result[] = [];
  apptfilters: Result[] = [];

  constructor(
    private hC: HttpClient,
    private router: Router,
    private appointmentServiceObj: AppointmentService,
    private registerServiceObj: RegisterService,
    private location: Location
  ) {}

  ngOnInit() {
    this.fetchDoctors();
    this.fetchAppointments();
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
    this.appointmentServiceObj.setDoctorDetails(doctor);
    this.router.navigate(['/dashboard/book-appointment-page']);
  }

  fetchAppointments() {
    this.registerServiceObj.getCurrentPatient().subscribe({
      next: (data) => {
        this.selectedPatient = data;
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
      },
    });

    this.hC.get<Appointment[]>('http://localhost:3000/appointment').subscribe(
      (data) => {
        this.appointments = data;
        this.apptfilters = this.appointments.filter(
          (element) => element.patemail == this.selectedPatient.patemail
        );
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  onClickCancelAppointment(result: any) {
    this.appointmentServiceObj.cancelAppointment(result);
    this.router
      .navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }
}
