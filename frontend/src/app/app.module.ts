import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WasteTypesComponent } from './waste-types/waste-types.component';
import { HomeComponent } from './home/home.component';




import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [

    AppComponent,
    NavbarComponent,
    WasteTypesComponent,
    HomeComponent,
  

    

    AppComponent,    
    AboutComponent, RegisterComponent

  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
