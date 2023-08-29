import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { finalize, Observable } from 'rxjs';
import { BaseComponent } from 'src/app/components/shared/base.component';
import { ResultadoPesquisaFilme } from 'src/app/models/resultado-pesquisa-filme';
import { FilmeService } from 'src/app/services/filme.service';
import { GeneroService } from 'src/app/services/genero.service';
import { PlataformaService } from 'src/app/services/plataforma.service';
import { FormUtils } from 'src/app/utils/form-utils';


@Component({
  selector: 'app-pesquisar-filme',
  templateUrl: './pesquisar-filme.component.html',
  styleUrls: ['./pesquisar-filme.component.scss']
})
export class PesquisarFilmeComponent extends BaseComponent implements OnInit {

  esconderPesquisa = false;
  generos$: Observable<Array<SelectItem<number>>>;
  plataformas$: Observable<Array<SelectItem<number>>>;
  resultados$: Observable<Array<ResultadoPesquisaFilme>>;

  formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null),
    descricao: new FormControl(null),
    classificacaoIndicativaMin: new FormControl(null),
    classificacaoIndicativaMax: new FormControl(null),
    generos: new FormControl(null, Validators.minLength(1)),
    plataforma: new FormControl(null)
  });

  constructor(
    private plataformaService: PlataformaService,
    private generoService: GeneroService,
    private filmeService: FilmeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.carregarGeneros();
    this.carregarPlataformas();
  }

  carregarGeneros() {
    this.generos$ = this.generoService.listarTransformSelectItens();
  }

  carregarPlataformas() {
    this.plataformas$ = this.plataformaService.listarTransformSelectItens();
  }

  validate() {
    FormUtils.forceValidateForm(this.formulario, this.pesquisar.bind(this));
  }

  limpar() {
    this.formulario.reset();
  }

  pesquisar() {
    this.resultados$ = this.filmeService.pesquisar(this.formulario.value).pipe(finalize(() => this.esconderPesquisa = true));
  }



}
