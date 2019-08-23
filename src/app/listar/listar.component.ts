import { Component, OnInit } from '@angular/core';
import { ArchivosService } from '../archivos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  archivos = [];
  Ids = null;

  constructor(private servicioArchivo: ArchivosService, private router:ActivatedRoute) { 
    this.Ids = router.snapshot.params.Ids;
    if(this.Ids != null){
      this.buscar(this.Ids);
    }else{
      this.listarItems();
    }
  }

  listarItems(){
    this.servicioArchivo.obtenerArchivos().subscribe(data => {
      this.archivos = data;
    });
  }

  buscar(Ids){
    let i = 0;
    let array = Ids.split(',')
    this.archivos = [];
    while (i < array.length){
      this.servicioArchivo.obtenerArchivo(array[i]).subscribe((data)=>{
        this.archivos.push(data);
      })
      i++;
    }
  }

  descargar(id){
    this.servicioArchivo.descargarArchivo(id);
  }

  Eliminar(id) {
    this.servicioArchivo.borrarArchivo(id).subscribe(data=>{
      this.listarItems();
    });
  }

  ngOnInit() {
  }

}
