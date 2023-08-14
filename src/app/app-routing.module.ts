import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
/*   {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'nova-conta',
    canActivate: [LoggedOutGuard],
    component: CadastroComponent
  }, */
  {
    path: 'login',
    canActivate: [LoggedOutGuard],
    component: LoginComponent
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
