import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/components/shared/base.component';
import { ResultadoPesquisaFilme } from 'src/app/models/resultado-pesquisa-filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  resultados$: Observable<Array<ResultadoPesquisaFilme>>;

  constructor(private filmeService: FilmeService) { super(); }

  ngOnInit(): void {
    this.resultados$ = this.filmeService.pesquisar();
  }

}
