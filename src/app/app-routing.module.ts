import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetRegistrosComponent } from './backend/set-registros/set-registros.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'encuesta', component: EncuestaComponent },
  { path: 'setRegistros', component: SetRegistrosComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
