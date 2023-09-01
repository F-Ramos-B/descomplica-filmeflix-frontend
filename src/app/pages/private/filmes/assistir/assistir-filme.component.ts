import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { BaseComponent } from 'src/app/components/shared/base.component';
import { AssistirFilme } from 'src/app/models/assistir-filme';
import { Avaliacao } from 'src/app/models/avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';
import { FilmeService } from 'src/app/services/filme.service';
import { PlaylistService } from 'src/app/services/playlist.service';

@Component({
  selector: 'app-assistir-filme',
  templateUrl: './assistir-filme.component.html',
  styleUrls: ['./assistir-filme.component.scss']
})
export class AssistirFilmeComponent extends BaseComponent implements OnInit {

  idFilme: number;
  filme$: Observable<AssistirFilme>;
  idPlaylistAtual: number;

  constructor(
    private filmeService: FilmeService,
    private avaliacaoService: AvaliacaoService,
    private playlistService: PlaylistService,
    private router: Router,
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
          return this.filmeService.assistir(this.idFilme);
        }),
        tap(() => {
          const idFilmeAtual = this.playlistService.idFilmeAtual;
          const idPlaylistAtual = this.playlistService.idPlaylistAtual;

          if (idPlaylistAtual && this.idFilme == idFilmeAtual) {
            this.idPlaylistAtual = idPlaylistAtual;
          }
        })
      );
  }

  cadastrar(novaAvaliacao: Avaliacao) {
    this.avaliacaoService.incluir(novaAvaliacao).subscribe(resposta => {
      this.toastSucesso(resposta.mensagem);
      this.carregarFilme();
    });
  }

  voltarParaPlaylist() {
    console.log('idPlaylist', this.idPlaylistAtual);

    if (this.idPlaylistAtual) {
      this.router.navigate(['playlists', 'assistir', this.idPlaylistAtual]);
    }
  }

}
