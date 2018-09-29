import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit {

  public inputCount = 1;
  public phoneNumber = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  validatePhoneNumber() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    this.http.post('http://niti.herokuapp.com/api/client_login_check', {'phone_number': this.phoneNumber}, httpOptions).subscribe((response) => {
      if (response['status'] == 'true') {
        this.inputCount += 2;
      } else {
        this.inputCount += 1;
      }
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
