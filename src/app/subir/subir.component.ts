import { Component, OnInit, NgZone } from '@angular/core';
import { ArchivosService } from '../archivos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subir',
  templateUrl: './subir.component.html',
  styleUrls: ['./subir.component.css']
})

export class SubirComponent implements OnInit {
  
  // Update Realizada con la guia de: https://blog.jscrambler.com/implementing-file-upload-using-node-and-angular/

  uploadedFiles: Array<File>;

  constructor(private servicio:ArchivosService, private ngZone:NgZone, private router:Router) { }
  
  subir(){
    
    //Este codigo esta hecho para subir multiples archivos, pero la api no lo soporta, por lo que de momento, es solo de a un archivo a la vez.

    let fromData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++){
      fromData.append("archivos", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.servicio.subirArchivo(fromData).subscribe(data =>{
      console.log(data);
      this.ngZone.run(()=>{this.router.navigateByUrl('/lista')})
    })

  }

  fileChange(element){
    this.uploadedFiles = element.target.files;
  }
  
  ngOnInit() { }

}
