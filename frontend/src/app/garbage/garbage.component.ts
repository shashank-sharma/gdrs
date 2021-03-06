import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-garbage',
  templateUrl: './garbage.component.html',
  styleUrls: ['./garbage.component.css']
})
export class GarbageComponent implements OnInit {

  public inputCount = 1;
  public phoneNumber = '';
  public otp = '';
  public firstname='';
  public lastname='';
  public gender='';
  public mail='';
  public password = '';
  public registrationStatus = false;

  constructor(private http: HttpClient, private router: Router) { }

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
        this.inputCount += 3;
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
      this.register();
    }
  }
  register()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    this.http.post('http://niti.herokuapp.com/api/v1/users/', {'phone_number': this.phoneNumber, 'password':this.password, 'first_name':this.firstname,'last_name':this.lastname, 'gender':this.gender,'is_client':true}, httpOptions).subscribe((response) => {
      if (response) {
        this.router.navigate(['waste']);
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
    } else if (this.inputCount == 2) {
      this.validateOtp();
      this.registrationStatus = true;
    } else if (this.inputCount == 3) {
      this.inputCount += 1;
    } else if (this.inputCount == 4) {
      this.validatePassword();
    }
  }

}
