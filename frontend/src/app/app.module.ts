import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
<<<<<<< HEAD
import { NavbarComponent } from './navbar/navbar.component';
import { WasteTypesComponent } from './waste-types/waste-types.component';
import { HomeComponent } from './home/home.component';



=======
import { AboutComponent } from './about/about.component';
>>>>>>> ef9262735da44a5fe2c3627e6625fdf2f8c6f3f2


@NgModule({
  declarations: [
<<<<<<< HEAD
    AppComponent,
    NavbarComponent,
    WasteTypesComponent,
    HomeComponent,
  

    
=======
    AppComponent,    
    AboutComponent
>>>>>>> ef9262735da44a5fe2c3627e6625fdf2f8c6f3f2
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
