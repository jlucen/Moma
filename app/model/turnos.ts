import {CalenData} from './calen-data';
export class Turnos {
  static primero:Date[]=[];
  static segundo:Date[]=[];
  static tercero:Date[]=[];
  static cuarto:Date[]=[];


  static setPrimero(date:Date){
    this.primero.push(date);
  }
  static getPrimero():Date[]{
    return this.primero;
  }
  static setSegundo(date:Date){
    this.segundo.push(date);
  }
  static getSegundo():Date[]{
    return this.segundo;
  }
  static setTercero(date:Date){
    this.tercero.push(date);
  }
  static getTercero():Date[]{
    return this.tercero;
  }
  static setCuarto(date:Date){
    this.cuarto.push(date);
  }
  static getCuarto():Date[]{
    return this.cuarto;
  }

  static leToca(calenData:CalenData):string{
    for (let i = 0; i < this.primero.length; i++) {
      if(calenData.dia == this.primero[i].getDate() && calenData.mes == this.primero[i].getMonth() && calenData.anyo == this.primero[i].getFullYear() ){
        return 'primero';
      }
   }
    for (let i = 0; i < this.segundo.length; i++) {
      if(calenData.dia == this.segundo[i].getDate() && calenData.mes == this.segundo[i].getMonth() && calenData.anyo == this.segundo[i].getFullYear() ){
        return 'segundo';
      }
   }
   for (let i = 0; i < this.tercero.length; i++) {
     if(calenData.dia == this.tercero[i].getDate() && calenData.mes == this.tercero[i].getMonth() && calenData.anyo == this.tercero[i].getFullYear() ){
       return 'tercero';
     }
  }
  for (let i = 0; i < this.cuarto.length; i++) {
    if(calenData.dia == this.cuarto[i].getDate() && calenData.mes == this.cuarto[i].getMonth() && calenData.anyo == this.cuarto[i].getFullYear() ){
      return 'cuarto';
    }
 }

}
 static esTurno(dia,calenData:CalenData){
  let style = 'alert-danger';
  for (let i = 0; i < this.getPrimero().length; i++) {
     if(this.getPrimero()[i].getDate()== dia && this.getPrimero()[i].getMonth()== calenData.mes){
          return 'J';
      }
  }
  for (let i = 0; i < this.getSegundo().length; i++) {
     if(this.getSegundo()[i].getDate()== dia && this.getSegundo()[i].getMonth()== calenData.mes){

        return 'G';
      }
  }
  for (let i = 0; i < this.getTercero().length; i++) {
     if(this.getTercero()[i].getDate()== dia && this.getTercero()[i].getMonth()== calenData.mes){

        return 'A';
      }
  }
  for (let i = 0; i < this.getCuarto().length; i++) {
     if(this.getCuarto()[i].getDate()== dia && this.getCuarto()[i].getMonth()== calenData.mes){

        return 'M';
      }
  }
  if(calenData.getClase() == "JF") style ="JF";
  return style;
}
}
