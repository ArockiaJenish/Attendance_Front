import { StudentService } from './../../student.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Output() sendUser: EventEmitter<any> = new EventEmitter<any>();

  constructor(private serv: StudentService, private router: Router, private dialogRef: MatDialogRef<SignInComponent>) { } //private _sharedService: SharedService,  @Inject(MAT_DIALOG_DATA) private data: any

  ngOnInit(): void {
  }

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  user: any;
  wrongCrdn: boolean = false;
  signIn() {
    if (this.signInForm.valid) {
      this.serv.login(this.signInForm.value).subscribe(res => {
        console.log('form response');
        this.user = res;
        if (this.user.id !== 0) {
          this.wrongCrdn = false;
          this.inSession(this.user);
        } else {
          this.wrongCrdn = true;
        }
        //console.log(res);
      }, err => {
        console.log('from error');
        console.log(err);
      })
    }

  }

  inSession(user: any) {
    //this.serv.loginMode(user);
    console.log('inSession()...');
    console.log(user);
    // this.sendUser.emit(user);
    //this._sharedService.emitChange(user);
    this.router.navigate(['session'],{state: {data: user}});
    this.dialogRef.close();
  }

}
