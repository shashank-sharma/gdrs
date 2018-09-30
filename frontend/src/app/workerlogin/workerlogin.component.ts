import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-workerlogin',
  templateUrl: './workerlogin.component.html',
  styleUrls: ['./workerlogin.component.css']
})
export class WorkerloginComponent implements OnInit {

  public phoneNumber: any;
  public password: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  validateAccount()
  {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };

    this.http.post('http://niti.herokuapp.com/api/driver_login', {'phone_number': this.phoneNumber, 'password': this.password}, httpOptions).subscribe((response: any) => {
      if (response) {
        localStorage.setItem('driver', response.token);
        localStorage.setItem('driver_pk', response.pk);
        this.router.navigate(['mapbox']);
      } else {
        alert('Incorrect password');
        console.log('Incorrect Password');
      }
    }, (error) => {
      console.log(error);
    });
  }
}
