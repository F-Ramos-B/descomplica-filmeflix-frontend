import { Injectable } from '@angular/core';

import { Ator } from '../models/ator';
import { BaseCrudEntityService } from './base-crud-entity.service';

@Injectable({
  providedIn: 'root',
})
export class AtorService extends BaseCrudEntityService<Ator> {

  override URL = this.BASE_URL + '/atores';

}
