import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  status: boolean;
  constructor(public userObj : RegisterService){}

  ngOnInit(): void{
    this.userObj.getPatientLoginStatus().subscribe({
      next: (status) => {this.status=status},
      error: (err) => {console.log("err is ",err)}
    })
  }
}
