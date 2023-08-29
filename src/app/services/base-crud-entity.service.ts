import { Injectable } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { map, mergeAll, Observable, toArray } from 'rxjs';

import { BaseCrudEntity } from '../models/base-crud-entity';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseCrudEntityService<T extends BaseCrudEntity, U = T> extends CrudService<T, U> {

  listarTransformSelectItens(labelKey?: keyof T, valueKey?: keyof T): Observable<Array<SelectItem<number>>> {
    return this.http.get<T[]>(this.selectItensURL())
      .pipe(
        mergeAll(),
        map(entity => BaseCrudEntity.asSelectItem(entity, labelKey, valueKey)),
        toArray()
      );
  }


  protected selectItensURL(): string {
    return this.URL;
  }
}
