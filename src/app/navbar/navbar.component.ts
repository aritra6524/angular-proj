import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  status: boolean;
  constructor(public us: UserService){}

  ngOnInit(): void{
    this.us.getUserLoginStatus().subscribe({
      next: (status) => {this.status=status},
      error: (err) => {console.log("err is ",err)}
    })
  }
}
