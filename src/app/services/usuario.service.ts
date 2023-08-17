import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

import { CrudService } from './crud.service';

const URL = 'http://localhost:3000/stefanini/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {

  URL = this.BASE_URL + '/usuarios';

  obterPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${URL}/${id}`);
  }

}
