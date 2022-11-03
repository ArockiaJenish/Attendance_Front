import { StudentService } from 'src/app/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading!: any;

  constructor(private serv: StudentService) { 
    this.serv.loader.subscribe(res => {
      this.loading = res;
    })
  }

  ngOnInit(): void {
  }

}
