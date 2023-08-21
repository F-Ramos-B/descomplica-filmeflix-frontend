import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { InclusaoBaseComponent } from 'src/app/components/shared/inclusao-base.component';
import { EnumTipoUsuario } from 'src/app/enums/enum-tipo-usuario.model';
import { BaseCrudEntity } from 'src/app/models/base-crud-entity';
import { Filme } from 'src/app/models/filme';
import { AdminService } from 'src/app/services/admin.service';
import { GeneroService } from 'src/app/services/genero.service';
import { PlataformaService } from 'src/app/services/plataforma.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormUtils } from 'src/app/utils/form-utils';


@Component({
  selector: 'app-cadastro-filme',
  templateUrl: './cadastro-filme.component.html',
  styleUrls: ['./cadastro-filme.component.scss']
})
export class CadastroFilmeComponent extends InclusaoBaseComponent<Filme> implements OnInit {

  idTipoFixo: number;
  generos$: Observable<Array<SelectItem<number>>>;
  plataformas$: Observable<Array<SelectItem<number>>>;

  formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null, Validators.required),
    descricao: new FormControl(null, Validators.required),
    linkImagem: new FormControl(null, [Validators.required, Validators.email]),
    linkFilme: new FormControl(null, Validators.required),
    classificacaoIndicativa: new FormControl(null, [Validators.required, Validators.min(6), Validators.max(18)]),
    generos: new FormControl(null, [Validators.required]),
    plataforma: new FormControl(null, [Validators.required]),
  });

  constructor(
    protected override injector: Injector,
    private plataformaService: PlataformaService,
    private generoService: GeneroService,
    private adminService: AdminService,
    private usuarioService: UsuarioService
  ) {
    super(injector);
    this.idTipoFixo = this.navigationParams?.tipo;
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
    this.usuarioService.incluir(this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  editar() {
    const isEdicaoAdmin = EnumTipoUsuario.ADMIN.id === this.idTipoFixo;
    const service = isEdicaoAdmin ? this.adminService : this.usuarioService;

    service.editar(this.idEdicao, this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  observarMudancaTipo() {
    if (this.idTipoFixo) {
      this.perfil.setValue(this.idTipoFixo);
    }

    if (this.idEdicao) {
      this.email.disable();
      this.carregarUsuario();
    }
  }

  carregarUsuario() {
    this.usuarioService.obterPorId(this.idEdicao).subscribe(usuario => this.formulario.patchValue(usuario));
  }

  voltar() {
    if (this.idTipoFixo) {
      const rota = EnumTipoUsuario.ADMIN.id === this.idTipoFixo ? 'admin' : 'usuario';
      this.router.navigate([rota]);
    } else {
      this.router.navigate(['login']);
    }
  }

  get dataNascimento(): FormControl {
    return this.formulario.get('dataNascimento') as FormControl;
  }

  get email(): FormControl {
    return this.formulario.get('email') as FormControl;
  }

  get perfil(): FormControl {
    return this.formulario.get('perfil') as FormControl;
  }

}
