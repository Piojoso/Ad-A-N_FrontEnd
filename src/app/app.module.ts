import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { SubirComponent } from './subir/subir.component';
import { DescargarComponent } from './descargar/descargar.component';
import { ListarComponent } from './listar/listar.component';

import { ArchivosService } from './archivos.service';
 
const routes: Route[] = [
  {path: '', component: IniciarSesionComponent},
  {path: 'descargar', component: DescargarComponent},
  {path: 'iniciar-sesion', component: IniciarSesionComponent},
  {path: 'lista', component: ListarComponent},
  {path: 'subir', component: SubirComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    SubirComponent,
    DescargarComponent,
    ListarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ArchivosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
