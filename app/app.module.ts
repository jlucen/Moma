import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { CookieService } from 'ngx-cookie-service';
import { ListadoTurnosComponent } from './listado-turnos/listado-turnos.component';
@NgModule({
  declarations: [
    AppComponent,
    CalendarioComponent,
    ListadoTurnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
