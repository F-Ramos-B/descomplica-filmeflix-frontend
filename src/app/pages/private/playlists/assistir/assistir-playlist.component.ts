import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, switchMap, tap } from 'rxjs';
import { BaseComponent } from 'src/app/components/shared/base.component';
import { Playlist } from 'src/app/models/playlist';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { FormUtils } from 'src/app/utils/form-utils';

import { PlaylistService } from '../../../../services/playlist.service';

@Component({
  selector: 'app-assistir-playlist',
  templateUrl: './assistir-playlist.component.html',
  styleUrls: ['./assistir-playlist.component.scss']
})
export class AssistirPlaylistComponent extends BaseComponent implements OnInit {

  activeIndex = -1;
  playlist$: Observable<Playlist>;

  formulario: FormGroup = new FormGroup({
    nota: new FormControl(null, Validators.required),
    critica: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
    idPlaylist: new FormControl(null)
  });

  constructor(
    private avaliacaoService: AvaliacaoService,
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.carregarPlaylist();
  }

  carregarPlaylist() {
    this.playlist$ = this.route.paramMap
      .pipe(
        switchMap(params => {
          const idPlaylist = Number(params.get('id'));
          this.playlistService.idPlaylistAtual = idPlaylist;
          this.formIdPlaylist.patchValue(idPlaylist);
          return this.playlistService.buscarPorId(idPlaylist);
        }),
        tap(playlist => {
          const idFilmeAtual = this.playlistService.idFilmeAtual;
          const idPlaylistAtual = this.playlistService.idPlaylistAtual;

          if (idFilmeAtual && playlist.id === idPlaylistAtual) {
            this.activeIndex = playlist.filmes.findIndex(filme => filme.id === idFilmeAtual);
          }
        })
      );
  }

  validate() {
    FormUtils.forceValidateForm(this.formulario, this.cadastrar.bind(this));
  }

  cadastrar() {
    this.avaliacaoService.incluir(this.formulario.value).subscribe(resposta => {
      this.toastSucesso(resposta.mensagem);
      this.carregarPlaylist();
    });
  }

  assistirFilme(idFilme: number) {
    this.playlistService.idFilmeAtual = idFilme;
    this.router.navigate(['filmes', 'assistir', idFilme]);
  }

  get formIdPlaylist(): FormControl {
    return this.formulario.get('idPlaylist') as FormControl;
  }

}
