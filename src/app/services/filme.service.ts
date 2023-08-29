import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AssistirFilme } from '../models/assistir-filme';
import { Filme } from '../models/filme';
import { FiltroPesquisarFilme } from '../models/pesquisar-filme';
import { ResultadoPesquisaFilme } from '../models/resultado-pesquisa-filme';
import { BaseCrudEntityService } from './base-crud-entity.service';

@Injectable({
  providedIn: 'root',
})
export class FilmeService extends BaseCrudEntityService<Filme> {

  override URL = this.BASE_URL + '/filmes';

  assistir(id: number): Observable<AssistirFilme> {
    return this.http.get<AssistirFilme>(`${this.URL}/assistir/${id}`);
  }

  pesquisar(filtro: FiltroPesquisarFilme = {}): Observable<ResultadoPesquisaFilme[]> {
    return this.http.get<ResultadoPesquisaFilme[]>(`${this.URL}/pesquisar/`, {
      params: this.construirQueryParams(filtro)
    });
  }

  protected override selectItensURL(): string {
    return `${this.URL}/select-itens`;
  }

}
