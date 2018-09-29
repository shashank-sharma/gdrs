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
  public otp = '';
  public password = '';
  public registrationStatus = false;

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

  validateOtp() {
    if (this.otp == '1234') {
      this.inputCount += 1;
    } else {
      console.log('error');
    }
  }

  validatePassword() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    if (!this.registrationStatus) {
      this.http.post('http://niti.herokuapp.com/api/client_login', {'phone_number': this.phoneNumber, 'password': this.password}, httpOptions).subscribe((response) => {
        if (response['status'] == 'true') {
          this.inputCount += 1;
        } else {
          console.log('Incorrect Password');
        }
      }, (error) => {
        console.log(error);
      });
    } else {
      this.http.post('http://niti.herokuapp.com/api/v1/users', {'phone_number': this.phoneNumber, 'password': this.password}, httpOptions).subscribe((response) => {
        console.log('authenticaated');
      }, (error) => {
        console.log(error);
      });
    }
  }

  next() {
    if(this.inputCount == 1) {
      this.validatePhoneNumber();
    } else if (this.inputCount == 2) {
      this.validateOtp();
      this.registrationStatus = true;
    } else if (this.inputCount == 3) {
      this.validatePassword();
    }
  }

}
