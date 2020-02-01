import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CalenData} from './../model/calen-data';
import { Turnos} from './../model/turnos';
import {Festivos} from './../model/festivos';
import { ListadoTurnosComponent } from '../listado-turnos/listado-turnos.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor(private cookieService:CookieService) { }
  calenData:CalenData;  //model atributos año , mes , dia , sel
  diasMes:CalenData[][]=[]; //array para los dias del mes
  diasSemana:string[]=[];
  meses:string[]=[];
  data:string[];
  showCalendario:boolean; // muestra el calendario base si es verdadero
                          // muestra la selecion escogida por el usuario 6 o 12 meses
  listado:ListadoTurnosComponent;
  mesesSeleccionados:string[]=[];
  diasMesesSeleccionados:CalenData[][][]=[];
  listAnyos:number[]=[];
  mona:number = 22;
  mes:string = "Abril";
  mona1:number = 13;
  mes1:string = "Abril";
  myclase:string;
  ngOnInit() {

    this.initData();
  }
  initData(){

    this.myclase="active";
    this.cookieService.set( 'Jose','2019,9,28');
    this.cookieService.set( 'Gregorio','2019,9,8');
    this.cookieService.set( 'Antonio', '2019,9,15');
    this.cookieService.set( 'Mercedes', '2019,9,22');
    this.cookieService.set( 'dos', '2019,8,20');
    this.arrayTurnos();
    this.showCalendario = true;
    this.diasSemana = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    this.meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    this.calenData = new CalenData();
    let date:Date = new Date();
    let anyo = date.getFullYear();
    this.calenData.dia = date.getDate();
    this.calenData.mes = date.getMonth();
    this.calenData.anyo = date.getUTCFullYear();
    this.calenData.dia=new Date(this.calenData.anyo,this.calenData.mes,1).getDay();
    this.diasMes = this.calenData.diasMes(this.calenData);
    this.calenData.sel = "Selecciona periodo 3 , 6 , 9 o 12 meses a partir del mes actual";
    this.mesesSeleccionados=[];
    this.diasMesesSeleccionados=[];
    this.diasMesesSeleccionados.push(this.diasMes);
    this.diasMesesSeleccionados = Festivos.esFiesta(this.diasMesesSeleccionados,this.meses);
  }
  anyoChange(anyo:number):void{
    this.calenData.anyo+=anyo;
    this.changeDate();
  }
  mesChange(mes:number):void{
    if(this.calenData.mes==11 && mes == 1){
        this.calenData.mes=0;
        this.calenData.anyo+=1;
        this.changeDate();
    }else if(this.calenData.mes==0 && mes== -1){
      this.calenData.mes=11;
      this.calenData.anyo+=mes;
      this.changeDate();
    }else{
        this.calenData.mes+= mes;
        this.changeDate();
    }
  }

  changeDate():void{
    this.calenData.dia=new Date(this.calenData.anyo,this.calenData.mes,1).getDay();
    this.diasMes = this.calenData.diasMes(this.calenData);
  //  this.diasMesesSeleccionados.push(this.diasMes);
  //  this.diasMesesSeleccionados = Festivos.esFiesta(this.diasMesesSeleccionados,this.meses);

  }

  createCalendario(){
    this.diasMesesSeleccionados=[];
    this.diasMes=[];
    this.mesesSeleccionados=[];
    this.listAnyos=[];
    let date:Date = new Date();
    let anyo = date.getFullYear();
    let cont = date.getMonth();
    let month:number = parseInt(this.calenData.sel);
    console.log(month);
    for (let i = 0; i < month; i++) {
      this.calenData = new CalenData();
      this.calenData.mes=cont;
      this.calenData.anyo=anyo;
      this.calenData.dia=new Date(this.calenData.anyo,this.calenData.mes,1).getDay();
      this.diasMes = this.calenData.diasMes(this.calenData);
      this.diasMesesSeleccionados.push(this.diasMes);
      this.listAnyos.push(anyo);
      this.mesesSeleccionados.push(this.meses[cont]);
      if (cont == 11){
        cont=0;
        anyo+=1;
      }else{
        cont++;
      }
    }
    this.diasMesesSeleccionados = Festivos.esFiesta(this.diasMesesSeleccionados,this.meses);
    this.showCalendario=false;
    this.calenData = new CalenData();
  }
  fecha(calen:CalenData){
    console.log(calen.getDia()+"  "+calen.getMes()+1+"  "+calen.getAnyo());
  }

  arrayTurnos():void{

     let cookie: {} = this.cookieService.getAll();
     Object.keys(cookie).forEach(key => {
     if (key=='Jose') {
        let time = new Date(JSON.parse(JSON.stringify(this.cookieService.get('Jose')))).getTime();
        Turnos.setPrimero(new Date(time));
        for (let i = 0; i < 20; i++) {
          let dias = 28*24*60*60*1000 //recuerda que en javascript se expresa en milisegundos
          let sabado = time+dias;
          time = sabado;
          if (new Date(sabado).getDay() != 6 && new Date(sabado).getFullYear() <=new Date().getFullYear()+1) {
            Turnos.setPrimero(new Date(this.ajuste(time,6)));
          }else if(new Date(sabado).getFullYear() <= new Date().getFullYear()+1){
            Turnos.setPrimero(new Date(sabado));
          }


        }

      }
      if (key=='Gregorio') {
        let time = new Date(JSON.parse(JSON.stringify(this.cookieService.get('Gregorio')))).getTime();
        Turnos.setSegundo(new Date(time));
        for (let i = 0; i < 20; i++) {
          let dias = 28*24*60*60*1000 //recuerda que en javascript se expresa en milisegundos
          let domingo = time+dias;
          time = domingo;
          if (new Date(domingo).getDay() != 0 && new Date(domingo).getFullYear() <=new Date().getFullYear()+1) {
            Turnos.setSegundo(new Date(this.ajuste(time,0)));
          }else if(new Date(domingo).getFullYear() <= new Date().getFullYear()+1){
            Turnos.setSegundo(new Date(domingo));
          }
        }

      }
      if (key=='Antonio') {
        let time = new Date(JSON.parse(JSON.stringify(this.cookieService.get('Antonio')))).getTime();
        Turnos.setTercero(new Date(time));
        for (let i = 0; i < 20; i++) {
          let dias = 28*24*60*60*1000 //recuerda que en javascript se expresa en milisegundos
          let domingo = time+dias;
          time = domingo;
          if (new Date(domingo).getDay() != 0 && new Date(domingo).getFullYear() <=new Date().getFullYear()+1) {
            Turnos.setTercero(new Date(this.ajuste(time,0)));
          }else if(new Date(domingo).getFullYear() <= new Date().getFullYear()+1){
            Turnos.setTercero(new Date(domingo));
          }

        }
      }
      if (key == 'Mercedes') {
        let time = new Date(JSON.parse(JSON.stringify(this.cookieService.get('Mercedes')))).getTime();
        Turnos.setCuarto(new Date(time));
        for (let i = 0; i < 20; i++) {
          let dias = 28*24*60*60*1000 //recuerda que en javascript se expresa en milisegundos
          let domingo = time+dias;
          time = domingo;
          if (new Date(domingo).getDay() != 0 && new Date(domingo).getFullYear() <=new Date().getFullYear()+1) {
            Turnos.setCuarto(new Date(this.ajuste(time,0)));
          }else if(new Date(domingo).getFullYear() <= new Date().getFullYear()+1){
            Turnos.setCuarto(new Date(domingo));
          }

        }
      }
      if (key == 'dos') {
          let time = new Date(JSON.parse(JSON.stringify(this.cookieService.get('dos')))).getTime();

          sessionStorage.setItem('cont','0');
          Festivos.arrayFestivos(time+24*60*60*1000);
      }

    });
  }
  ajuste(time,dia):Date{
    for (let i = 0; i < 2; i++) {
      let dias = 24*60*60*1000 //recuerda que en javascript se expresa en milisegundos
      let turno = time+dias;
      if (new Date(turno).getDay() == dia ) {
        return new Date(turno);
      }
      time = turno;
  }
}
}
