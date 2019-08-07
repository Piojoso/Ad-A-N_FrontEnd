import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ArchivosService } from '../archivos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  //@Input() archivos;

  archivos = [];

  constructor(private servicioArchivo: ArchivosService, private ngZone:NgZone, private router:Router) { 
    this.listarItems();
  }

  listarItems(){
    this.servicioArchivo.obtenerArchivos().subscribe(data => {
      this.archivos = data;
      console.log(data);
    });
  }

  Eliminar(id) {
    this.servicioArchivo.borrarArchivo(id).subscribe(data=>{
      console.log(data);
      this.listarItems();
    });
  }

  ngOnInit() {
  }

}
