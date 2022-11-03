import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/student.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Student Checkin';

  constructor(private dialog: MatDialog, private serv: StudentService) { }
  ngOnInit(): void {

  }

  login: boolean = this.serv.status;

  signUp() {
    console.log("Sign up..");

    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '30%'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

  }

  signIn() {
    console.log("Sign In");
    const dialogRef = this.dialog.open(SignInComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  setSession(user: any) {
    console.log('from app component');
    console.log(user);
  }
}
