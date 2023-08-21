import { Injectable } from '@angular/core';

import { Plataforma } from '../models/plataforma';
import { BaseCrudEntityService } from './base-crud-entity.service';

@Injectable({
  providedIn: 'root',
})
export class PlataformaService extends BaseCrudEntityService<Plataforma> {

  override URL = this.BASE_URL + '/plataformas';

}
