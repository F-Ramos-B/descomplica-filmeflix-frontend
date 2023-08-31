import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

import { BaseComponent } from './../shared/base.component';
import { EnumTipoUsuario } from 'src/app/enums/enum-tipo-usuario.model';
import { Usuario } from 'src/app/models/usuario';
import { TipoUsuarioPipe } from 'src/app/pipes/tipo-usuario.pipe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {

  private readonly titleCasePipe = new TitleCasePipe();
  private readonly tipoUsuarioPipe = new TipoUsuarioPipe();

  menuItems: MenuItem[] = [];
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { super(); }

  ngOnInit(): void {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd), takeUntil(this.ngUnsubscribe$)).subscribe(() => {
      this.usuario = this.authService.getUsuario();
      console.log(this.usuario);

      this.buildMenu();
    });
  }

  showHeader() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return EnumTipoUsuario.ADMIN.id === this.usuario?.perfil;
  }

  isUsuario() {
    return EnumTipoUsuario.USUARIO.id === this.usuario?.perfil;

  }
  buildMenu() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: this.PrimeIcons.HOME,
        routerLink: ['']
      },
      {
        label: 'Filmes',
        icon: this.PrimeIcons.HOME,
        items: [...this.buildFilmesPlaylistsMenu('filmes')]
      },
      {
        label: 'Playlists / Séries',
        icon: this.PrimeIcons.LIST,
        items: [...this.buildFilmesPlaylistsMenu('playlists')]
      },
      {
        label: 'Assistir Playlist Teste',
        icon: this.PrimeIcons.HOME,
        routerLink: ['playlists', 'assistir', 4]
      },
      {
        label: 'Atores',
        icon: this.PrimeIcons.STAR_FILL,
        items: [...this.buildFilmesPlaylistsMenu('atores')]
      },
      /* this.buildAtoresMenu(), */
      {
        label: `Área do ${this.tipoUsuarioPipe.transform(this.usuario?.perfil)}`,
        icon: this.PrimeIcons.ID_CARD,
        items: [...this.buildAreaMenu(this.isAdmin())]
      },
      {
        label: 'Deslogar',
        icon: this.PrimeIcons.SIGN_OUT,
        command: () => this.authService.logout()
      }
    ];
  }

  private buildFilmesPlaylistsMenu(tipo: string): MenuItem[] {
    return [
      {
        label: 'Pesquisar',
        icon: this.PrimeIcons.SEARCH,
        routerLink: [tipo, 'pesquisar']
      },
      {
        label: 'Incluir',
        icon: this.PrimeIcons.PLUS,
        routerLink: [tipo, 'incluir']
      }
    ];
  }

  private buildAtoresMenu(): MenuItem {

    const pesquisarAtores = {
      label: 'Atores',
      icon: this.PrimeIcons.STAR_FILL,
      routerLink: ['atores', 'pesquisar']
    };

    if (this.isUsuario()) {
      return pesquisarAtores;
    }

    return {
      label: pesquisarAtores.label,
      icon: pesquisarAtores.icon,
      items: [
        {
          label: 'Pesquisar',
          icon: this.PrimeIcons.SEARCH,
          routerLink: pesquisarAtores.routerLink
        },
        {
          label: 'Incluir',
          icon: this.PrimeIcons.PLUS,
          routerLink: ['atores', 'incluir']
        }
      ]
    };
  }

  private buildAreaMenu(podeIncluir: boolean): MenuItem[] {
    return [
      this.buildSubMenu('admins', this.PrimeIcons.STAR, podeIncluir, EnumTipoUsuario.ADMIN.id),
      this.buildSubMenu('usuarios', this.PrimeIcons.USER, podeIncluir, EnumTipoUsuario.USUARIO.id),
      {
        label: 'Minhas avaliações',
        icon: this.PrimeIcons.BOOK,
        routerLink: ['minhas-avaliacoes']
      }
    ];
  }

  buildSubMenu(nome: string, icon: string, podeIncluir: boolean = true, tipo?: number): MenuItem {
    const menu: MenuItem = {
      label: `${this.titleCasePipe.transform(nome)}`,
      icon
    };

    if (podeIncluir) {
      menu.items = [...this.buildSubMenuCrud(nome, tipo)];
    } else {
      menu.routerLink = [nome];
    }

    return menu;
  }

  buildSubMenuCrud(nome: string, tipo?: number): MenuItem[] {
    return [
      {
        label: 'Listar',
        icon: this.PrimeIcons.LIST,
        routerLink: [nome]
      },
      {
        label: 'Incluir',
        icon: this.PrimeIcons.PLUS,
        routerLink: [nome, 'incluir'],
        state: tipo ? { tipo } : null
      }
    ];
  }

}
