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
    return EnumTipoUsuario.is.ADMIN(this.usuario?.perfil);
  }

  isUsuario() {
    return EnumTipoUsuario.is.USUARIO(this.usuario?.perfil);
  }

  buildMenu() {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-home',
        routerLink: ['']
      },
      {
        label: 'Filmes',
        icon: 'pi pi-fw pi-home',
        items: [...this.buildFilmesPlaylistsMenu('filmes')]
      },
      {
        label: 'Playlists / Séries',
        icon: 'pi pi-fw pi-list',
        items: [...this.buildFilmesPlaylistsMenu('playlists')]
      },
      this.buildAtoresMenu(),
      {
        label: `Área do ${this.tipoUsuarioPipe.transform(this.usuario?.perfil)}`,
        icon: 'pi pi-fw pi-id-card',
        items: [...this.buildAreaMenu(this.isAdmin())]
      },
      {
        label: 'Deslogar',
        icon: 'pi pi-fw pi-sign-out',
        command: () => this.authService.logout()
      }
    ];
  }

  private buildFilmesPlaylistsMenu(tipo: string): MenuItem[] {
    return [
      {
        label: 'Pesquisar',
        icon: 'pi pi-fw pi-search',
        routerLink: [tipo, 'pesquisar']
      },
      {
        label: 'Incluir',
        icon: 'pi pi-fw pi-plus',
        routerLink: [tipo, 'incluir']
      }
    ];
  }

  private buildAtoresMenu(): MenuItem {

    const pesquisarAtores = {
      label: 'Atores',
      icon: 'pi pi-fw pi-star-fill',
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
          icon: 'pi pi-fw pi-search',
          routerLink: pesquisarAtores.routerLink
        },
        {
          label: 'Incluir',
          icon: 'pi pi-fw pi-plus',
          routerLink: ['atores', 'incluir']
        }
      ]
    };
  }

  private buildAreaMenu(podeIncluir: boolean): MenuItem[] {
    return [
      this.buildSubMenu('admins', 'pi-star', podeIncluir, EnumTipoUsuario.ADMIN.id),
      this.buildSubMenu('usuarios', 'pi-user', podeIncluir, EnumTipoUsuario.USUARIO.id),
      {
        label: 'Minhas avaliações',
        icon: 'pi pi-fw pi-home',
        routerLink: ['minhas-avaliacoes']
      }
    ];
  }

  buildSubMenu(nome: string, icon: string, podeIncluir: boolean = true, tipo?: number): MenuItem {
    const menu: MenuItem = {
      label: `${this.titleCasePipe.transform(nome)}`,
      icon: `pi pi-fw ${icon}`
    };

    if (podeIncluir) {
      menu.items = [...this.buildSubMenuCrud(nome, tipo)];
    } else {
      menu.routerLink = [`/${nome}`];
    }

    return menu;
  }

  buildSubMenuCrud(nome: string, tipo?: number): MenuItem[] {
    return [
      {
        label: 'Listar',
        icon: 'pi pi-fw pi-list',
        routerLink: [`/${nome}`]
      },
      {
        label: 'Incluir',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: [`/${nome}/incluir`],
        state: tipo ? { tipo } : null
      }
    ];
  }

}
