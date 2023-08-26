import { Injectable } from '@angular/core';

import { Filme } from '../models/filme';
import { CrudService } from './crud.service';
import { Observable } from 'rxjs';
import { AssistirFilme } from '../models/assistir-filme';
import { ResultadoPesquisaFilme } from '../models/resultado-pesquisa-filme';
import { FiltroPesquisarFilme } from '../models/pesquisar-filme';

@Injectable({
  providedIn: 'root',
})
export class FilmeService extends CrudService<Filme> {

  override URL = this.BASE_URL + '/filmes';

  assistir(id: number): Observable<AssistirFilme> {
    return this.http.get<AssistirFilme>(`${this.URL}/assistir/${id}`);
  }

  pesquisar(filtro: FiltroPesquisarFilme): Observable<ResultadoPesquisaFilme[]> {
    return this.http.get<ResultadoPesquisaFilme[]>(`${this.URL}/pesquisar/`, {
      params: this.construirQueryParams(filtro)
    });
  }

}
