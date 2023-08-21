import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import Mensagem from '../models/mensagem';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService<T, U = T> extends BaseService {

  buscarPorId(id: number): Observable<T> {
    return this.http.get<T>(`${this.URL}/${id}`);
  }

  listar(filtro: Partial<T> = {}): Observable<T[]> {
    return this.http.get<T[]>(this.URL, {
      params: filtro as any
    });
  }

  incluir(entity: T): Observable<Mensagem<U>> {
    return this.http.post<Mensagem<U>>(this.incluirURL(), entity);
  }

  incluirURL(): string {
    return this.URL;
  }

  editar(id: number, entity: T): Observable<Mensagem<U>> {
    return this.http.put<Mensagem<U>>(`${this.URL}/${id}`, entity);
  }

  excluir(id: number): Observable<Mensagem<void>> {
    return this.http.delete<Mensagem<void>>(`${this.URL}/${id}`);
  }

}
