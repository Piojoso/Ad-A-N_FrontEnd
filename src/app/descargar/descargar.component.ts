import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ArchivosService  } from '../archivos.service';
import { Archivo } from '../archivos';

@Component({
  selector: 'app-descargar',
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.css']
})
export class DescargarComponent implements OnInit {

  //@Input() nombreArchivo; //Aca hay que poner el nombre del archivo que vamos a descargar
  @ViewChild('bindingInput', { static: false }) bindingInput: ElementRef;

  archivo: Archivo;
  id = 3;

  constructor(private servicio: ArchivosService) { 
    
  }

  descargar(){
    console.log(this.id);
    this.servicio.obtenerArchivo(this.id).subscribe(data =>{
      console.log(data);
      this.archivo = data;
    })
  }

  //COMO por alguna razon el doble binding no me funciona, o hay algo que estoy haciendo mal, creo esta funcion que de hecho la vi en la
  //mismisima pagina de angula.io

  getValueForID(): any{
    this.id = this.bindingInput.nativeElement.value;
  }


  ngOnInit() {
  }

}
