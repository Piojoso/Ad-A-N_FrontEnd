import { Component, OnInit } from '@angular/core';
import { ArchivosService } from '../../services/archivos/archivos.service';
import { ActivatedRoute } from '@angular/router';
import { ShowErrorService } from '../../services/showError/show-error.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  archivos = [];
  Ids = null;

  constructor(
    private servicioArchivo: ArchivosService, 
    private router: ActivatedRoute,
    private showError: ShowErrorService) {
    
    // esto pronto desaparecera de aca (tengo pensado hacer un servicio para compartir esta info.), pero por ahora se queda.
    this.Ids = router.snapshot.params.Ids;
    if(this.Ids != null){
      this.buscar(this.Ids);
    }else{
      this.listarItems();
    }
  }

  listarItems(){
    this.servicioArchivo.obtenerArchivos().subscribe(
      data => {
        this.archivos = data;
      }, err => {
        this.dispatchError(err);
      }
    );
  }

  buscar(Ids){
    let i = 0;
    let array = Ids.split(',')
    this.archivos = [];
    while (i < array.length){
      this.servicioArchivo.obtenerArchivo(array[i]).subscribe(
        data=>{
          this.archivos.push(data);
        }, err => {
          this.dispatchError(err);
        }
      );
      i++;
    }
  }

  descargar(id){
    this.servicioArchivo.descargarArchivo(id);
  }

  Eliminar(id) {
    this.servicioArchivo.borrarArchivo(id).subscribe(
      ()=>{
        this.listarItems();
      }, err => {
        this.dispatchError(err);
      }
    );
  }

  dispatchError(err) {
    this.showError.dispatchError(err);
  }

  ngOnInit() {
  }

}
