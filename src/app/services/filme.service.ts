import { Injectable } from '@angular/core';

import { Filme } from '../models/filme';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';
import { AssistirFilme } from '../models/assistir-filme';

@Injectable({
  providedIn: 'root',
})
export class FilmeService extends CrudService<Filme> {

  override URL = this.BASE_URL + '/filmes';

  assistir(id: number): Observable<AssistirFilme> {
    return this.http.get<AssistirFilme>(`${this.URL}/assistir/${id}`);
  }

}
