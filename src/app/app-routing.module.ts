import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedOutGuard } from './guards/logged-out.guard';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { HomeComponent } from './pages/private/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AssistirFilmeComponent } from './pages/private/filmes/assistir/assistir-filme.component';
import { PesquisarFilmeComponent } from './pages/private/filmes/pesquisar/pesquisar-filme.component';
import { CadastroFilmeComponent } from './pages/private/filmes/cadastro/cadastro-filme.component';
import { CadastroPlaylistComponent } from './pages/private/playlists/cadastro/cadastro-playlist.component';
import { AssistirPlaylistComponent } from './pages/private/playlists/assistir/assistir-playlist.component';
import { CadastroAtorComponent } from './pages/private/atores/cadastro/cadastro-ator.component';

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
        component: PesquisarFilmeComponent
      },
      {
        path: 'assistir/:id',
        component: AssistirFilmeComponent
      }
    ]
  },
  {
    path: 'playlists',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'incluir',
        component: CadastroPlaylistComponent
      },
      {
        path: 'pesquisar',
        component: PesquisarFilmeComponent
      },
      {
        path: 'assistir/:id',
        component: AssistirPlaylistComponent
      }
    ]
  },
  {
    path: 'atores',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'incluir',
        component: CadastroAtorComponent
      },
      {
        path: 'pesquisar',
        component: PesquisarFilmeComponent
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
