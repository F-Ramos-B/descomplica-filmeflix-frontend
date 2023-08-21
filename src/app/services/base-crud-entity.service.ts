import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { map, mergeAll, Observable, toArray } from 'rxjs';

import { BaseCrudEntity } from '../models/base-crud-entity';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseCrudEntityService<T extends BaseCrudEntity, U = T> extends CrudService<T, U> {

  listarSelectItens(filtro: Partial<T> = {}): Observable<Array<SelectItem<number>>> {
    return this.http.get<T[]>(this.URL, {
      params: filtro as any
    })
    .pipe(
      mergeAll(),
      map(BaseCrudEntity.asSelectItem),
      toArray()
    );
  }

}
