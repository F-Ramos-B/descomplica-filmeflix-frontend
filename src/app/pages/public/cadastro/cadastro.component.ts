import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { InclusaoBaseComponent } from 'src/app/components/shared/inclusao-base.component';

import { EnumTipoUsuario } from '../../../enums/enum-tipo-usuario.model';
import { AdminService } from '../../../services/admin.service';
import { UsuarioService } from './../../../services/usuario.service';
import { FormUtils } from './../../../utils/form-utils';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent extends InclusaoBaseComponent<Usuario> implements OnInit {

  idTipoFixo: number;
  dataMinima = new Date();
  tipos: SelectItem<number>[] = EnumTipoUsuario.asSelectItem();
  override isAdmin: boolean = true;

  formulario: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    apelido: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    senha: new FormControl(null, Validators.required),
    perfil: new FormControl(EnumTipoUsuario.USUARIO.nome, Validators.required),
    dataNascimento: new FormControl(null, [Validators.required]),
    genero: new FormControl(null, Validators.required)
  });

  constructor(
    protected override injector: Injector,
    private adminService: AdminService,
    private usuarioService: UsuarioService
  ) {
    super(injector);
    this.idTipoFixo = this.navigationParams?.tipo;
  }

  ngOnInit(): void {
    this.observarMudancaTipo();
  }

  validate() {
    const operacao = this.idEdicao ? this.editar.bind(this) : this.cadastrar.bind(this);
    FormUtils.forceValidateForm(this.formulario, operacao);
  }

  cadastrar() {
    this.usuarioService.incluir(this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  editar() {
    const isEdicaoAdmin = EnumTipoUsuario.is.ADMIN(this.idTipoFixo);
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
      const rota = EnumTipoUsuario.is.ADMIN(this.idTipoFixo) ? 'admin' : 'usuario';
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