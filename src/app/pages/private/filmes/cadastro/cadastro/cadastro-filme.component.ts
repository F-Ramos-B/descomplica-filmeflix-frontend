import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { InclusaoBaseComponent } from 'src/app/components/shared/inclusao-base.component';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/services/filme.service';
import { GeneroService } from 'src/app/services/genero.service';
import { PlataformaService } from 'src/app/services/plataforma.service';
import { FormUtils } from 'src/app/utils/form-utils';


@Component({
  selector: 'app-cadastro-filme',
  templateUrl: './cadastro-filme.component.html',
  styleUrls: ['./cadastro-filme.component.scss']
})
export class CadastroFilmeComponent extends InclusaoBaseComponent<Filme> implements OnInit {

  generos$: Observable<Array<SelectItem<number>>>;
  plataformas$: Observable<Array<SelectItem<number>>>;

  formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null, Validators.required),
    descricao: new FormControl(null, Validators.required),
    linkImagem: new FormControl(null, Validators.required),
    linkFilme: new FormControl(null, Validators.required),
    classificacaoIndicativa: new FormControl(null, [Validators.required, Validators.min(6), Validators.max(18)]),
    generos: new FormControl(null, [Validators.required, Validators.minLength(1)]),
    plataforma: new FormControl(null, [Validators.required])
  });

  constructor(
    protected override injector: Injector,
    private plataformaService: PlataformaService,
    private generoService: GeneroService,
    private filmeService: FilmeService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.carregarGeneros();
    this.carregarPlataformas();
    this.observarMudancaTipo();
  }

  carregarGeneros() {
    this.generos$ = this.generoService.listarSelectItens();
  }

  carregarPlataformas() {
    this.plataformas$ = this.plataformaService.listarSelectItens();
  }

  validate() {
    const operacao = this.idEdicao ? this.editar.bind(this) : this.cadastrar.bind(this);
    FormUtils.forceValidateForm(this.formulario, operacao);
  }

  cadastrar() {
    this.filmeService.incluir(this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  editar() {
    this.filmeService.editar(this.idEdicao, this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  observarMudancaTipo() {
    if (this.idEdicao) {
      this.carregarFilme();
    }
  }

  carregarFilme() {
    this.filmeService.buscarPorId(this.idEdicao).subscribe(filme => this.formulario.patchValue(filme));
  }

  voltar() {
    this.router.navigate(['']);
  }

}
