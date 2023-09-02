import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from 'src/app/components/shared/base.component';
import { Playlist } from 'src/app/models/playlist';

import { PlaylistService } from '../../../../services/playlist.service';

@Component({
  selector: 'app-listar-playlist',
  templateUrl: './listar-playlist.component.html',
  styleUrls: ['./listar-playlist.component.scss']
})
export class ListarPlaylistComponent extends BaseComponent implements OnInit {

  playlists$: Observable<Array<Playlist>>;

  constructor(
    private playlistService: PlaylistService
  ) {
    super();
  }

  ngOnInit(): void {
    this.listarPlaylists();
  }

  listarPlaylists() {
    this.playlists$ = this.playlistService.listar();
  }

}
