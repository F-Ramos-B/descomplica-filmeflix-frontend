import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InclusaoBaseComponent } from 'src/app/components/shared/inclusao-base.component';
import { Ator } from 'src/app/models/ator';
import { AtorService } from 'src/app/services/ator.service';
import { FormUtils } from 'src/app/utils/form-utils';

@Component({
  selector: 'app-cadastro-ator',
  templateUrl: './cadastro-ator.component.html',
  styleUrls: ['./cadastro-ator.component.scss']
})
export class CadastroAtorComponent extends InclusaoBaseComponent<Ator> implements OnInit {

  formulario: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    sobrenome: new FormControl(null, Validators.required),
    dataNascimento: new FormControl(null, Validators.required),
    biografia: new FormControl(null, Validators.required),
  });

  constructor(
    protected override injector: Injector,
    private atorService: AtorService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.observarMudancaTipo();
  }

  validate() {
    const operacao = this.idEdicao ? this.editar.bind(this) : this.cadastrar.bind(this);
    FormUtils.forceValidateForm(this.formulario, operacao);
  }

  cadastrar() {
    this.atorService.incluir(this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  editar() {
    this.atorService.editar(this.idEdicao, this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  observarMudancaTipo() {
    if (this.idEdicao) {
      this.carregarAtor();
    }
  }

  carregarAtor() {
    this.atorService.buscarPorId(this.idEdicao).subscribe(ator => this.formulario.patchValue(ator));
  }

  voltar() {
    this.router.navigate(['']);
  }

}
