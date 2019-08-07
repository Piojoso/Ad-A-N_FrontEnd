import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ArchivosService  } from '../archivos.service';
import { Archivo } from '../archivos';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-descargar',
  templateUrl: './descargar.component.html',
  styleUrls: ['./descargar.component.css']
})
export class DescargarComponent implements OnInit {

  //@Input() nombreArchivo; //Aca hay que poner el nombre del archivo que vamos a descargar

  archivo: Archivo;
  id;

  constructor(private servicio: ArchivosService) { 
    
  }

  descargar(){
    let infoFile;
    this.servicio.obtenerArchivo(this.id).subscribe(data =>{
      infoFile=data;
      saveAs('192.168.1.197:3000/api/archivo/' + this.id, infoFile.name);
    });
  }

  ngOnInit() {
  }

  // Realizada con la guia de: https://www.youtube.com/watch?v=NsHgvKeAEDI
  attachmentList:any = [];
/*
  constructor(private _fileService:FileService){

    this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
      this.attachmentList.push(JSON.parse(response));
    }
  }
*/
/* 
  download(index){
    var filename = this.attachmentList[index].uploadname;

    this.servicio.obtenerArchivo(filename).subscribe(
      data => saveAs(data, filename),
      error => console.error(error)
    );
  }
*/
}
