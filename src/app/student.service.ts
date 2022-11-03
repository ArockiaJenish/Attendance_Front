import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  login(value: any) {
    console.log(value);
    return this.http.post(this.loginApi,value);
  }

  loader = new BehaviorSubject<Boolean>(false);

  public objFromSession: any;

  
  status: boolean = false;
  user!: any;
  constructor(private http: HttpClient) { }
  //domain: string = 'localhost';
  domain: string = '192.168.0.171';
  registerApi: string = 'http://'+this.domain+':9090/student/registerStudent';
  loginApi: string = 'http://'+this.domain+':9090/student/login';
  checkInApi: string = 'http://'+this.domain+':9090/student/checkIn/';
  checkOutApi: string = 'http://'+this.domain+':9090/student/checkOut/';
  attendanceApi: string = 'http://'+this.domain+':9090/student/getAttendanceDetails/';

  
  registerStudent(value: any):any{
    console.log(value);
    return this.http.post(this.registerApi,value);
  }

  loginMode(value: any){
    console.log('loginMode hitted');
    
    this.status = true;
    this.user = value;
  }

  checkIn(user: any){
    return this.http.get(this.checkInApi+user.id);
  }

  checkOut(user: any){
    return this.http.get(this.checkOutApi+user.id);
  }

  attendance(user: any){
    return this.http.get(this.attendanceApi+user.id);
  }
}
