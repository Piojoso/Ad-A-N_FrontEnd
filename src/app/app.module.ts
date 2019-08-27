import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { SubirComponent } from './components/subir/subir.component';
import { DescargarComponent } from './components/descargar/descargar.component';
import { ListarComponent } from './components/listar/listar.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';

import { ArchivosService } from './services/archivos/archivos.service';
 
const routes: Route[] = [
  {path: '', component: IniciarSesionComponent},
  {path: 'download', component: DescargarComponent},
  {path: 'logIn', component: IniciarSesionComponent},
  {path: 'listar', component: ListarComponent},
  {path: 'listar/search', component: ListarComponent},
  {path: 'upload', component: SubirComponent},
  {path: 'logUp', component: RegistrarseComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    IniciarSesionComponent,
    SubirComponent,
    DescargarComponent,
    ListarComponent,
    RegistrarseComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ArchivosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
