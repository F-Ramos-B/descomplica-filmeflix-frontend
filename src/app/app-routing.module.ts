import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedOutGuard } from './guards/logged-out.guard';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './pages/private/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroFilmeComponent } from './pages/private/filmes/cadastro/cadastro/cadastro-filme.component';
import { AssistirFilmeComponent } from './pages/private/filmes/assistir/assistir.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  {
    path: 'filmes',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'incluir',
        component: CadastroFilmeComponent
      },
      {
        path: 'pesquisar',
        component: CadastroComponent
      },
      {
        path: 'assistir/:id',
        component: AssistirFilmeComponent
      }
    ]
  },
  {
    path: 'nova-conta',
    canActivate: [LoggedOutGuard],
    component: CadastroComponent
  },
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
