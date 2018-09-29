import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WasteTypesComponent } from './waste-types/waste-types.component';
import { HomeComponent } from './home/home.component';




import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';

import { RouterModule, Routes } from '@angular/router';
import { GarbageComponent } from './garbage/garbage.component';

import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MapBoxComponent } from './map-box/map-box.component';
import { WorkerloginComponent } from './workerlogin/workerlogin.component';
import { AdminComponent } from './admin/admin.component';
import {MapService} from './map.service';



const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'garbage', component: GarbageComponent},
  {path: 'waste', component: WasteTypesComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'worker-login' , component:WorkerloginComponent},
  {path: 'mapbox' , component:MapBoxComponent},
  {path: 'map', component: MapBoxComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WasteTypesComponent,
    HomeComponent,
    AppComponent,
    AboutComponent,
    RegisterComponent,
    GarbageComponent,
    MapBoxComponent,
    WorkerloginComponent,
    AdminComponent,  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
