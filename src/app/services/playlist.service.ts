import { Injectable } from '@angular/core';

import { Playlist } from '../models/playlist';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService extends CrudService<Playlist> {

  override URL = this.BASE_URL + '/playlists';

}
