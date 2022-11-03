import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  logDate: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<TimeComponent>) {
    console.log("form time component...")
    console.log(this.data);
   }

  ngOnInit(): void {
    for(let d of this.data){
      this.logDate = d.date;
      break;
    }
  }

  close(){
    console.log("Time component closed...");
    this.dialog.close();
  }

}
