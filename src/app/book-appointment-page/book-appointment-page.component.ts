import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';

interface Doctor {
  docfirstname: string;
  doclastname:string;
  docspecialization: string;
  docqualification: string;
  cliniccity: string;
  clinicaddress: string;
}

@Component({
  selector: 'app-book-appointment-page',
  templateUrl: './book-appointment-page.component.html',
  styleUrls: ['./book-appointment-page.component.css']
})
export class BookAppointmentPageComponent implements OnInit {

  constructor(private hC: HttpClient, private serviceObj: AppointmentService) {}
  selectedDoctor:Doctor=null;

  ngOnInit(): void {
    this.serviceObj.getDoctorDetails().subscribe({
      next:(data)=>{
        this.selectedDoctor=data;
      },
      error:(error) => {
          console.error('Error fetching doctors:', error);
      }
    })
  }
}
