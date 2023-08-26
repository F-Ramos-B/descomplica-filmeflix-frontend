import { Injectable } from '@angular/core';

import { Avaliacao } from '../models/avaliacao';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoService extends CrudService<Avaliacao> {

  override URL = this.BASE_URL + '/avaliacoes';

}
