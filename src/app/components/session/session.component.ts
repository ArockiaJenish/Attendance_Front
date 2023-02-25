import { TimeComponent } from './../time/time.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from './../../student.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Inject, OnInit, Output, NgModule } from '@angular/core';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})


export class SessionComponent implements OnInit {

  //@Output() sendUser: EventEmitter<any> = new EventEmitter<any>();

  user: any;
  checkinTime!: string;
  checkinTimeForCalculate!: string;
  session: boolean = false;
  constructor(private router: Router, private serv: StudentService, private dialog: MatDialog) {
    this.user = this.router.getCurrentNavigation()?.extras.state;
    // console.log('in session component');
    this.user = this.user.data;
    // console.log(this.user);
    if (this.user.loginTime !== null)
      this.checkinTime = this.user.loginTime;
    else
      this.checkinTime = '00:00:00';
    //this.sendUser.emit(this.user)
  }

  response: any; //for checkin

  ngOnInit(): void {
    this.session = true;
    this.check = this.user.checkIn;
    this.checkinTimeForCalculate = this.checkinTime;
    if (this.user.checkIn)
      this.startTimer();
  }


  check: boolean = false;

  checkIn() {
    this.check = true
    console.log('checkin clicked');
    this.serv.checkIn(this.user).subscribe(res => {
      console.log(res);
    }, err => {
      //console.log(err);
      this.response = err;
      console.log(this.response)
      console.log(this.response.error.text);
      this.checkinTime = this.response.error.text;
      this.checkinTimeForCalculate = this.checkinTime;

      if (this.attRecord)
        this.attendance();

      this.startTimer();
    })
  }


  checkOut() {
    console.log('checkout clicked');
    this.serv.checkOut(this.user).subscribe(res => {
      console.log(res);
    }, err => {
      //console.log(err);
      this.response = err;
      console.log(this.response);
      console.log(this.response.error.text);
      this.checkinTime = this.response.error.text;
      this.checkinTimeForCalculate = this.checkinTime;
      if (this.attRecord)
        this.attendance();
      this.pauseTimer();
    })
    this.check = false;
  }

  interval!: any;
  checkDate!: any;
  startTimer() {
    this.checkDate = new Date();
    this.interval = setInterval(() => {

      var difTime = this.makeDiffOfTime();
      console.log(new Date().getMonth());
      this.checkinTime = addTimes(this.checkinTimeForCalculate, difTime);

    }, 1000)
  }

  makeDiffOfTime() {

    let tempLogin = new Date(this.checkDate.getFullYear(), this.checkDate.getMonth(), this.checkDate.getDate(), this.checkDate.getHours(), this.checkDate.getMinutes(), this.checkDate.getSeconds());
  
    let diff = new Date().getTime() - tempLogin.getTime();

    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    
    var difTime = this.format(hours) + ":" + this.format(minutes) + ':' + this.format(seconds);
    
    return difTime;
  }

  format(v: number): any {
    if (v < 10)
      return '0' + v;
    else
      return v;
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  attRecord: any;

  attendance() {
    this.serv.attendance(this.user).subscribe(res => {
      this.attRecord = res;
      console.log(this.attRecord);
    }, err => {
      this.attRecord = err
      console.log(this.attRecord);
    })
  }

  logOut() {
    console.log("logged out...");
    //this.user = null;
    this.pauseTimer();
  }

  timeLog(log: any) {
    console.log(log);
    const ref = this.dialog.open(TimeComponent, { data: log },);
  }


}

function addTimes(totTime: any, curTime: any) {

  const z = (n: number) => (n < 10 ? '0' : '') + n;

  //console.log(curTime, "curTime");
  const t = totTime.split(':');
  const t2 = curTime.split(':');
  let totTimeDate = new Date();
  totTimeDate.setHours(t[0]);
  totTimeDate.setMinutes(t[1]);
  totTimeDate.setSeconds(t[2]);
  //console.log(totTimeDate, 'totTimeDate');
  const totTimeMilSec = totTimeDate.getTime();//start time.......
  const curTimeMilSec = (t2[0] * 60 * 60 * 1000) + (t2[1] * 60 * 1000) + (t2[2] * 1000);//end time......
  //console.log(totTimeMilSec, "totTimeMilSec");
  //console.log(curTimeMilSec, "curTimeMilSec");
  const runTime = new Date(totTimeMilSec + curTimeMilSec);
  //console.log(runTime, "runTime");
  let run = z(runTime.getHours()) + ':' + z(runTime.getMinutes()) + ':' + z(runTime.getSeconds());
  //console.log(run, "run");
  return run;

}

// function addTime(difTime: string, checkinTime: string) {
//   var times = [difTime, checkinTime];
//   var miSecond = 0;
//   for (let time of times) {
//     let t = time.split(":");
//     miSecond += parseInt(t[0]);
//     miSecond += parseInt(t[1]);
//     miSecond += parseInt(t[2]);
//   }

//   let hh = miSecond / 3600;
//   miSecond %= 3600;
//   let mm = miSecond / 60;
//   miSecond %= 60;
//   let ss = miSecond;

//   console.log(hh + ':' + mm + ':' + ss);

// }



