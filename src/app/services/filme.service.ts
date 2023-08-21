import { Injectable } from '@angular/core';

import { Filme } from '../models/filme';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class FilmeService extends CrudService<Filme> {

  override URL = this.BASE_URL + '/filmes';

}
