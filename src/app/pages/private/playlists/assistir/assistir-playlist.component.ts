import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { BaseComponent } from 'src/app/components/shared/base.component';
import { Avaliacao } from 'src/app/models/avaliacao';
import { Playlist } from 'src/app/models/playlist';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';

import { PlaylistService } from '../../../../services/playlist.service';

@Component({
  selector: 'app-assistir-playlist',
  templateUrl: './assistir-playlist.component.html',
  styleUrls: ['./assistir-playlist.component.scss']
})
export class AssistirPlaylistComponent extends BaseComponent implements OnInit {

  activeIndex = -1;
  playlist$: Observable<Playlist>;

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

  cadastrar(novaAvaliacao: Avaliacao) {
    this.avaliacaoService.incluir(novaAvaliacao).subscribe(resposta => {
      this.toastSucesso(resposta.mensagem);
      this.carregarPlaylist();
    });
  }

  assistirFilme(idFilme: number) {
    this.playlistService.idFilmeAtual = idFilme;
    this.router.navigate(['filmes', 'assistir', idFilme]);
  }

}
