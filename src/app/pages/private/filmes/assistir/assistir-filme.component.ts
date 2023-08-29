import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BaseComponent } from 'src/app/components/shared/base.component';
import { AssistirFilme } from 'src/app/models/assistir-filme';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { FilmeService } from 'src/app/services/filme.service';
import { FormUtils } from 'src/app/utils/form-utils';

@Component({
  selector: 'app-assistir-filme',
  templateUrl: './assistir-filme.component.html',
  styleUrls: ['./assistir-filme.component.scss']
})
export class AssistirFilmeComponent extends BaseComponent implements OnInit {

  idFilme: number;
  filme$: Observable<AssistirFilme>;

  formulario: FormGroup = new FormGroup({
    nota: new FormControl(null, Validators.required),
    critica: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
    idFilme: new FormControl(null)
  });

  constructor(
    private filmeService: FilmeService,
    private avaliacaoService: AvaliacaoService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.carregarFilme();
  }

  carregarFilme() {
    this.filme$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          this.idFilme = Number(params.get('id'));
          this.formIdFilme.patchValue(this.idFilme);
          return this.filmeService.assistir(this.idFilme);
        })
      );
  }

  validate() {
    FormUtils.forceValidateForm(this.formulario, this.cadastrar.bind(this));
  }

  cadastrar() {
    this.avaliacaoService.incluir(this.formulario.value).subscribe(resposta => {
      this.toastSucesso(resposta.mensagem);
      this.carregarFilme();
    });
  }

  get formIdFilme(): FormControl {
    return this.formulario.get('idFilme') as FormControl;
  }

}
