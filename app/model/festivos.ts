import {CalenData} from './calen-data';
export class Festivos {
  static clases = ["JF","GF","AF","MF"];
  static festivos:Date[]=[];
  static fiestasAsignadas:string[][]=[];

  static setFestivos(date:Date):void{
    this.festivos.push(date);
  }
  static getFestivos():Date[]{
    return this.festivos;
  }

  static setFiestasAsignadas(date:string[]):void{
    this.fiestasAsignadas.push(date);
  }
  static getFiestasAsignadas():string[][]{
    return this.fiestasAsignadas;
  }



    /**
    @autor jlucena
    @descripción funcion que inicializa la tabla de festivos desde el mes "actual"
                 Llama a la funcion pascua para que calcule el viernes santo dia de la mona y segunda pascua
    */
   static arrayFestivos(time:number):void{
    let date:Date = new Date();
    let calenData:CalenData= new CalenData();
    let pascua:Date[] = [];
    let auxFestivos:Date[]=[];

    for (let i = 0; i < 2; i++) {
      let anyo:number = date.getFullYear();
      let nose:any[]= calenData.pascua(anyo+i);
      pascua=nose;
      let dia:number = pascua[0].getDate();
      let mes:number = pascua[0].getMonth();
      anyo = pascua[0].getFullYear();

      Festivos.setFestivos( new Date(date.getFullYear()+i,0,1));
      Festivos.setFestivos( new Date(date.getFullYear()+i,0,6));
      Festivos.setFestivos( new Date(anyo,mes,dia));
      dia = pascua[1].getDate();
      mes = pascua[1].getMonth();
      anyo = pascua[1].getFullYear();
      Festivos.setFestivos( new Date(anyo,mes,dia));
      Festivos.setFestivos( new Date(date.getFullYear()+i,4,1));
      Festivos.setFestivos( new Date(date.getFullYear()+i,5,24));
      dia = pascua[2].getDate();
      mes = pascua[2].getMonth();
      anyo = pascua[2].getFullYear();
      Festivos.setFestivos( new Date(anyo,mes,dia));
      Festivos.setFestivos( new Date(date.getFullYear()+i,7,15));
      Festivos.setFestivos( new Date(date.getFullYear()+i,8,11));
      Festivos.setFestivos( new Date(date.getFullYear()+i,8,24));
      Festivos.setFestivos( new Date(date.getFullYear()+i,9,12));
      Festivos.setFestivos( new Date(date.getFullYear()+i,10,1));
      Festivos.setFestivos( new Date(date.getFullYear()+i,11,6));
      Festivos.setFestivos( new Date(date.getFullYear()+i,11,8));
      Festivos.setFestivos( new Date(date.getFullYear()+i,11,25));
      Festivos.setFestivos( new Date(date.getFullYear()+i,11,26));
      }
    }
    static esFiesta(calenData:CalenData[][][],meses:string[]):CalenData[][][] {
      this.fiestasAsignadas=[];
      let jose:string[]=[];
      let grego:string[]=[];
      let antonio:string[]=[];
      let merche:string[]=[];
      let cont = parseInt(sessionStorage.getItem("cont"));
      let diasSemana:string[] = ["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"];
      for (let i = 0; i < calenData.length; i++) {
        for (let j = 0; j < calenData[i].length; j++) {
          for (let k = 0; k < calenData[i][j].length; k++) {
            if(calenData[i][j][k].getClase() == 'alert-primary' || calenData[i][j][k].getClase() == 'alert-danger'){
             for (let l = 0; l < Festivos.getFestivos().length; l++) {
               if(Festivos.getFestivos()[l].getFullYear() == calenData[i][j][k].getAnyo() &&
                  Festivos.getFestivos()[l].getMonth() == calenData[i][j][k].getMes() &&
                  Festivos.getFestivos()[l].getDate() == calenData[i][j][k].getDia()){
                    let diaFiesta = diasSemana[Festivos.getFestivos()[l].getDay()]+" "+Festivos.getFestivos()[l].getDate()+" ";
                        diaFiesta += meses[Festivos.getFestivos()[l].getMonth()]+" de "+Festivos.getFestivos()[l].getUTCFullYear();
                        switch(cont){
                          case 0:
                          jose.push(diaFiesta);
                          break;
                          case 1:
                          grego.push(diaFiesta);
                          break;
                          case 2:
                          antonio.push(diaFiesta);
                          break;
                          case 3:
                          merche.push(diaFiesta);
                          break;
                          default:
                          console.log("Error en festvos.ts , funcion esFiesta");
                          break;
                        }

                    calenData[i][j][k].setClase(this.clases[cont]);
                    calenData[i][j][k].setDia(this.clases[cont]);
                    cont++;
                    if (cont >=4)cont=0;
                  }

             }
           }
          }
        }
      }
      this.setFiestasAsignadas(jose);
      this.setFiestasAsignadas(grego);
      this.setFiestasAsignadas(antonio);
      this.setFiestasAsignadas(merche);
      
      return calenData;
    }

}
