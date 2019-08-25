import { Component, OnInit, NgZone } from '@angular/core';
import { ArchivosService } from '../archivos.service';
import { Router } from '@angular/router';
import { ShowErrorService } from '../show-error.service';

@Component({
  selector: 'app-subir',
  templateUrl: './subir.component.html',
  styleUrls: ['./subir.component.css']
})

export class SubirComponent implements OnInit {
  
  // Upload Realizado con la guia de: https://blog.jscrambler.com/implementing-file-upload-using-node-and-angular/

  uploadedFiles: Array<File>;

  // ngZone es realmente necesario?
  constructor(private servicio:ArchivosService, private ngZone:NgZone, private router:Router, private showError: ShowErrorService) { }
  
  subir(){
    
    //Este codigo esta hecho para subir multiples archivos, pero la api no lo soporta, por lo que de momento, es solo de a un archivo a la vez.
    // update: si hago qe se suban de a uno... quizas funcionaria, en vez de subir un array, voy subiendo de a un archivo por vez... tengo que verlo.
    let fromData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++){
      fromData.append("archivos", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
    this.servicio.subirArchivo(fromData).subscribe(data =>{
      console.log(data);
      this.ngZone.run(()=>{this.router.navigateByUrl('/listar')})
    }, err => {
      this.showError.dispatchError(err);
    });
  }

  fileChange(element){
    this.uploadedFiles = element.target.files;
    // esto podria eliminarlo... Tengo que verlo.
  }

  cancel() {
    this.uploadedFiles = new Array<File>();
  }
  
  ngOnInit() { }
}
