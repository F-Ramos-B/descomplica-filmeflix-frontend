import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { InclusaoBaseComponent } from 'src/app/components/shared/inclusao-base.component';
import { Filme } from 'src/app/models/filme';
import { AtorService } from 'src/app/services/ator.service';
import { FilmeService } from 'src/app/services/filme.service';
import { GeneroService } from 'src/app/services/genero.service';
import { PlataformaService } from 'src/app/services/plataforma.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { FormUtils } from 'src/app/utils/form-utils';

@Component({
  selector: 'app-cadastro-playlist',
  templateUrl: './cadastro-playlist.component.html',
  styleUrls: ['./cadastro-playlist.component.scss']
})
export class CadastroPlaylistComponent extends InclusaoBaseComponent<Filme> implements OnInit {

  filmes$: Observable<Array<SelectItem<number>>>;

  formulario: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    descricao: new FormControl(null, Validators.required),
    linkImagem: new FormControl(null, Validators.required),
    filmes: new FormControl(null, [Validators.required, Validators.minLength(1)]),
  });

  constructor(
    protected override injector: Injector,
    private filmeService: FilmeService,
    private playlistService: PlaylistService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.carregarFilmes();
    this.observarMudancaTipo();
  }

  carregarFilmes() {
    this.filmes$ = this.filmeService.listarTransformSelectItens();
  }

  validate() {
    const operacao = this.idEdicao ? this.editar.bind(this) : this.cadastrar.bind(this);
    FormUtils.forceValidateForm(this.formulario, operacao);
  }

  cadastrar() {
    this.playlistService.incluir(this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  editar() {
    this.playlistService.editar(this.idEdicao, this.formulario.value).subscribe(resposta => this.confirmarOperacao(resposta));
  }

  observarMudancaTipo() {
    if (this.idEdicao) {
      this.carregarPlaylist();
    }
  }

  carregarPlaylist() {
    this.playlistService.buscarPorId(this.idEdicao).subscribe(playlist => this.formulario.patchValue(playlist));
  }

  voltar() {
    this.router.navigate(['']);
  }

}
