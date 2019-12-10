import { Component, OnInit, NgZone } from '@angular/core';
import { ArchivosService } from '../../services/archivos/archivos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';
import { Archivo } from 'src/app/interfaces/archivos';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

    uploadedFiles: Array<File>;

    public archivo: Archivo;

    constructor(private servicio:ArchivosService, private router:Router, private showError: ShowErrorService, private route: ActivatedRoute) { }

    actualizar(){
        let fromData = new FormData();
        for (var i = 0; i < this.uploadedFiles.length; i++){
            fromData.append("archivos", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }
        this.servicio.actualizarArchivo(this.archivo._id, fromData).subscribe(data =>{
            this.router.navigateByUrl('/listar');
        }, err => {
            this.showError.dispatchError(err);
        });
    }

    fileChange(element){
        this.uploadedFiles = element.target.files;
    }

    cancel() {
        this.uploadedFiles = new Array<File>();
    }

    ngOnInit() {
        let id = this.route.snapshot.params.fileID;
        this.servicio.obtenerArchivo(id).subscribe(data=>{
            this.archivo = data;
        }, err => {
            this.showError.dispatchError(err);
        });
    }
}
