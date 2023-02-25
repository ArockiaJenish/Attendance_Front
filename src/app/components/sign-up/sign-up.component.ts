import { MatDialogRef } from '@angular/material/dialog';
import { StudentService } from './../../student.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private serv: StudentService, private dialogRef: MatDialogRef<SignUpComponent>) { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    cnfPassword: new FormControl('', Validators.required)
  });

  response!: string;
  matches: boolean = true;
  submited: boolean = false;
  signUp() {
    this.submited = true;
    console.log(this.signUpForm);
    if (this.signUpForm.value.password === this.signUpForm.value.cnfPassword)
      this.matches = true;
    else
      this.matches = false;

    if (this.signUpForm.valid && this.matches) {
      this.serv.registerStudent(this.signUpForm.value).subscribe({
        next: data => {
          console.log("Response");
          console.log(data);
        },
        error: err => {
          console.log("from error");
          console.log(err);
          this.response = err.error.text;
          if (this.response === "Registered Successfully")
            setTimeout(() => this.dialogRef.close(), 2000);
        }
      })
    }
  }

  cancel() {

  }

}
