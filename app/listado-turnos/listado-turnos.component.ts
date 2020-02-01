import { Component, OnInit } from '@angular/core';
import { CalenData} from './../model/calen-data';
import { Festivos } from '../model/festivos';

@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {

  constructor() { }
  listFestivos:string[];
  listTurnos:string[];
  bfestivos:boolean = false;
  bturnos:boolean = false;
  ngOnInit(){

  }
   dataListado(calenData:CalenData[][][],meses:string[],clase:string):void {
    console.log(clase);
    this.listFestivos=[];
    this.listTurnos=[];
    let cont=0;
    let festivos:Date[] = Festivos.getFestivos();
    let diasSemana:string[] = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
    for (let i = 0; i < calenData.length; i++) {
      for (let j = 0; j < calenData[i].length; j++) {
        for (let k = 0; k < calenData[i][j].length; k++) {
           for (let l = 0; l < Festivos.getFestivos().length; l++) {
              if(calenData[i][j][k].getClase() == clase){
                console.log(calenData[i][j][k].getClase()+"   "+clase);
                cont++;
                let diaFiesta = diasSemana[k]+" "+(calenData[i][j][k].getDia()+1)+" ";
                diaFiesta += meses[calenData[i][j][k].getMes()]+" de "+calenData[i][j][k].getAnyo();
                this.listFestivos.push(diaFiesta);
                this.listTurnos.push(diaFiesta);
              }
            }
          }
        }
      }
      console.log(cont);
    }
  }
