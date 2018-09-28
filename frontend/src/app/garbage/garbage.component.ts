import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit {

  public inputCount = 1;

  constructor(private http: HttpClient,) { }

  ngOnInit() {
  }

  validatePhoneNumber() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    console.log(this.loginJson.getRawValue());

    this.http.post('http://niti.herokuapp.com/rest-auth/login/', this.loginJson.getRawValue(), httpOptions).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  next() {
    if(this.inputCount == 1) {
      this.validatePhoneNumber();
    }
  }

}
