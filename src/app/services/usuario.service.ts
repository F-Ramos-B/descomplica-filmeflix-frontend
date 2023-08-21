import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends CrudService<Usuario> {

  override URL = this.BASE_URL + '/auth';

  obterPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${URL}/${id}`);
  }

  override incluirURL(): string {
    return `${this.URL}/registrar`;
  }

}
