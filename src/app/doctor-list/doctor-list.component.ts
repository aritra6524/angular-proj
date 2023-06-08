import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { FormGroup } from '@angular/forms';

interface Doctor {
  docid: number;
  docfirstname: string;
  doclastname: string;
  docspecialization: string;
  docqualification: string;
  cliniccity: string;
}

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
})
export class DoctorListComponent implements OnInit {
  docForm: FormGroup;

  doctors: Doctor[] = [];

  constructor(
    private hC: HttpClient,
    private router: Router,
    private serviceObj: AppointmentService
  ) {}

  ngOnInit() {
    this.fetchDoctors();
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
}
