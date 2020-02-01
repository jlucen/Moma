import{Turnos} from './turnos';
import {Festivos} from './festivos';
export class CalenData {

  //  PROPIEDADES
  dia:any;
  mes:number;
  anyo:number;
  clase:string;
  sel:any;
  arrayNumbers:any[][]=[];
// CONSTRUCTOR

  constructor(dia?:any,mes?:number,anyo?:number,sel?:any,clase?:string){
    this.setDia(dia);
    this.setMes(mes);
    this.setAnyo(anyo);
    this.setSel(sel);
    this.setClase(clase);
  }
// GETTERS AND SETTERS
  setDia(dia:any):void{
    this.dia = dia;
  }
  setMes(mes:number):void{
    this.mes=mes;
  }
  setAnyo(anyo:number):void{
    this.anyo = anyo;
  }
  setSel(sel:any){
    this.sel = sel;
  }
  setClase(clase){
    this.clase=clase;
  }
  getDia():any{
    return this.dia;
  }
  getMes():number{
    return this.mes;
  }
  getAnyo():number{
    return this.anyo;
  }
  getSel():any{
    return this.sel;
  }
  getClase():string{
    return this.clase;
  }
  diasMes(calenData:CalenData):CalenData[][]{
    let diasMes:number = 0;
    let arrayNumbers:CalenData[][] = [];
    let diaSemana = 7-(calenData.dia+1);
    if(calenData.dia==0)
      diaSemana=6;
      else
      diaSemana=calenData.dia-1;

    let semana:any[]=[];
    for (let i = 0; i < diaSemana; i++) {
      let style = 'alert-secondary';
      semana.push(new CalenData("",calenData.mes,calenData.anyo,"",style));
    }
    let cont=1;
    switch(calenData.mes){
    case 0: case 2: case 4: case 6: case 7: case 9: case 11:
      diasMes = 31;
      break;
    case 1:
      diasMes = 28;
      if(this.bisiesto(calenData.anyo)) diasMes = 29;
    break;
    default:
        diasMes = 30;
        break;
  }

    for (let i = 0; i < 6 ; i++) {
      for (let j = diaSemana; j < 7; j++) {
        let style = 'alert-primary';
          if(j>=5) style = Turnos.esTurno(cont,calenData);
           //style = Festivos.esFiesta(cont,calenData,style);
          if (style != 'alert-danger' && style != 'alert-primary') {
             semana.push(new CalenData(style,calenData.mes,calenData.anyo,"",style));
           }else{
             
            semana.push(new CalenData(cont,calenData.mes,calenData.anyo,"",style));
           }

        cont++;
        diaSemana=0;
        if(cont>diasMes)break;
      }
      if(semana.length <7){
        for (let i = semana.length; i <7; i++) {
          let style = 'alert-secondary';
          semana.push(new CalenData("x",calenData.mes,calenData.anyo,"",style));
        }

      }

      arrayNumbers.push(semana);

        semana=[];
        if(cont>diasMes)break;
     }
     if(arrayNumbers.length == 5){
       for (let i = 0; i <7; i++) {
         let style = 'alert-secondary';
         semana.push(new CalenData("x",calenData.mes,calenData.anyo,"",style));
       }
       arrayNumbers.push(semana);
     }

    return arrayNumbers;
  }
  bisiesto(anyo:number):boolean{
  if (((anyo % 4 == 0) && (anyo % 100 != 0 )) || (anyo % 400 == 0)){
    return true;
  }
  return false;
  }
  pascua(annio) {
    let M:number;
    let N:number;
    let dia:number;
    let mes:number;
    let pascua:Date[]=[];

 if      (annio>1583 && annio<1699) { M=22; N=2; }
 else if (annio>1700 && annio<1799) { M=23; N=3; }
 else if (annio>1800 && annio<1899) { M=23; N=4; }
 else if (annio>1900 && annio<2099) { M=24; N=5; }
 else if (annio>2100 && annio<2199) { M=24; N=6; }
 else if (annio>2200 && annio<2299) { M=25; N=0; }
 let a = annio % 19;
 let b = annio % 4;
 let c = annio % 7;
 let d = ((19*a) + M) % 30;
 let e = ((2*b) + (4*c) + (6*d) + N) % 7;
 let f = d + e;
 if (d + e < 10) {
  dia = f + 22;
  mes = 3;
 } else  {
  dia = f - 9;
  mes = 4;
 };
 if (dia == 26 && mes == 4){
  dia = 19;
 };
 if (dia == 25 && mes == 4 && d == 28 && e == 6 && a > 10){
  dia = 18;
 };
 let date= new Date(annio,mes-1,dia-2);
 pascua.push(date);
 pascua.push(this.lunes_pascua(date));
 pascua.push(this.lunes_pentecostes(date));
 return pascua;
}
lunes_pascua(pascua){
 let time = pascua.getTime();
 let dias = 3*24*60*60*1000 //recuerda que en javascript se expresa en milisegundos
 let lunes = time+dias;
 let mona = new Date(lunes);
 return mona;
}
lunes_pentecostes(pascua){
 let time = pascua.getTime();
 let dias = 52*24*60*60*1000 //recuerda que en javascript se expresa en milisegundos
 let lunes = time+dias;
 let pentecostes = new Date(lunes);
 return pentecostes;
}


}
