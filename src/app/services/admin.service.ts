import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends CrudService<Usuario> {

  override URL = this.BASE_URL + '/auth';

}
