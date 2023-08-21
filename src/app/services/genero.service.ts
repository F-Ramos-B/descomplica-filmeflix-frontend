import { Injectable } from '@angular/core';

import { BaseCrudEntity } from '../models/base-crud-entity';
import { BaseCrudEntityService } from './base-crud-entity.service';

@Injectable({
  providedIn: 'root',
})
export class GeneroService extends BaseCrudEntityService<BaseCrudEntity> {

  override URL = this.BASE_URL + '/generos';

}
