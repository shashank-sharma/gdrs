import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-workerlogin',
  templateUrl: './workerlogin.component.html',
  styleUrls: ['./workerlogin.component.css']
})
export class WorkerloginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  search()
  {
    this.router.navigate(['mapbox']);
  }
}
