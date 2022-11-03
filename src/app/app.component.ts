import { Router } from '@angular/router';

import { StudentService } from './student.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading: any;
  constructor(private router: Router, private serv: StudentService){
    serv.loader.subscribe(res => {
      this.loading = res;
    })
  }

  ngOnInit(){
    this.router.navigateByUrl("/login");
  }
}
