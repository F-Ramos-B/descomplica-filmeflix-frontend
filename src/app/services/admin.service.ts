import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends CrudService<Usuario> {

  protected override readonly URL: string = 'http://localhost:3000/stefanini/professor';

}
