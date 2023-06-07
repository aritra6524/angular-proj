
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginStatus: boolean = false;
  currentUser: boolean = false;

  userLoginStatusBehaviorSubject = new BehaviorSubject(this.userLoginStatus);
  currentUserBehaviorSubject = new BehaviorSubject(this.currentUser);

  setUserLoginStatus(status){
    this.userLoginStatusBehaviorSubject.next(status);
  }

  getUserLoginStatus(){
    return this.userLoginStatusBehaviorSubject.asObservable();
  }

  setCurrentStatus(userObj){
    this.currentUserBehaviorSubject = new BehaviorSubject(this.currentUser);
  }

  getCurrentStatus(){
    return this.currentUserBehaviorSubject.asObservable();
  }

  constructor(private hc: HttpClient){}
}
