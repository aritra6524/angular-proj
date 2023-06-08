import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Doctor {
  docfirstname: string;
  doclastname:string;
  docspecialization: string;
  docqualification: string;
  cliniccity: string;
}

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDoctors();
  }

  fetchDoctors() {
    this.http.get<Doctor[]>('http://localhost:3000/doctor').subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  bookAppointment(doctor: Doctor) {
    console.log(`Booking appointment with ${doctor.docfirstname}${doctor.doclastname}`);
    // Implement your appointment booking logic here
  }
}
