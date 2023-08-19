import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/components/shared/base.component';

import { EnumTipoUsuario } from './../../enums/enum-tipo-usuario.model';
import { Usuario } from '../../models/usuario';
import { AuthService } from './../../services/auth.service';

@Injectable()
export abstract class PrivateBaseComponent extends BaseComponent implements OnDestroy {

  public usuario: Usuario;
  public isAdmin: boolean;
  protected navigationParams: any;

  constructor(
    protected authService: AuthService,
    protected router: Router
  ) {
    super();
    this.usuario = this.authService.getUsuario();
    this.isAdmin = EnumTipoUsuario.ADMIN.id === this.usuario?.perfil;
    this.navigationParams = this.router.getCurrentNavigation()?.extras?.state;
  }

}
