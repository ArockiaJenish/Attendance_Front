import { LoaderComponent } from './components/loader/loader.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/student.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private serv: StudentService, private dialog: MatDialog) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.serv.loader.next(true);
    var dialogRef = this.dialog.open(LoaderComponent);

    return next.handle(req).pipe(
      finalize(
        () => {
          this.serv.loader.next(false);
          dialogRef.close();
        }
      )
    )
  }
}
