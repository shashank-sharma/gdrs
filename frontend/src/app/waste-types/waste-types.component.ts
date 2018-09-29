import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-waste-types',
  templateUrl: './waste-types.component.html',
  styleUrls: ['./waste-types.component.css']
})
export class WasteTypesComponent implements OnInit {

	public inputCount  = 1;
	public wasteType = " ";
	public quantity = " ";
	public nextStatus = false;
	public lat = " ";
	public lng = " ";

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  validateStatus()
  {
  	const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };
    this.http.post('http://niti.herokuapp.com/api/v1/garbage_status/', {'user':1, 'lat': this.lat,'long': this.lng,'waste_type':this.wasteType,'quantity':this.quantity,'status':'In-Progress'}, httpOptions).subscribe((response) => {
      if (response['status'] == 'true') {
        this.inputCount += 2;
      } else {
        this.inputCount += 1;
      }
    }, (error) => {
      console.log(error);
    });
  }
  showMap(){
  	this.inputCount+=1;
  }

  showTypes(){
  	this.inputCount+=1;
  }

  showQuantity(){
  	this.inputCount+=1;
  }

  showStatus(){

  }



next() {
    if(this.inputCount == 1) {
      this.showMap();
    } else if (this.inputCount == 2) {
      this.showTypes();
      this.registrationStatus = true;
    } else if (this.inputCount == 3) {
      this.showQuantity();
    }else if (this.inputCount == 4) {
      this.showStatus();
    }
  }

getquantity(j)
{
	this.quantity=j;
	console.log(this.quantity);
	this.next();

}

getValue(i) {
	this.wasteType=i;
	this.next();
}
	
	getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(position => {
	        this.lat = position.coords.latitude;
	        this.lng = position.coords.longitude;
	        console.log(this.lat, this.lng);
	        }
	    }else{ 
	        this.x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	    this.next();
	}
}