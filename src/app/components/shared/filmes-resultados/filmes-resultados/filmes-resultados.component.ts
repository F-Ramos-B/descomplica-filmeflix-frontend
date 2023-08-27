import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResultadoPesquisaFilme } from 'src/app/models/resultado-pesquisa-filme';

import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-filmes-resultados',
  templateUrl: './filmes-resultados.component.html',
  styleUrls: ['./filmes-resultados.component.scss']
})
export class FilmesResultadosComponent extends BaseComponent {

  @Input({ required: true }) resultados$: Observable<Array<ResultadoPesquisaFilme>>;

  constructor(
    private router: Router
  ) {
    super();
  }

  assistirFilme(idFilme: number) {
    this.router.navigate(['filmes', 'assistir', idFilme]);
  }

}
