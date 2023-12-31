import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FilmeFlixUtils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {

  protected readonly BASE_URL: string = 'http://localhost:8080/filmeflix';

  protected abstract URL: string;

  constructor(protected http: HttpClient) { }

  protected construirQueryParams<T extends object>(params: T, httpParams: HttpParams = new HttpParams()): HttpParams {
    Object.keys(params).forEach(chave => {
      const valor = params[chave];

      if (FilmeFlixUtils.isObject(valor)) {
        httpParams = this.construirQueryParams(valor, httpParams);
      } else if (FilmeFlixUtils.isListaPreenchida(valor)) {
        valor.filter((item: any) => FilmeFlixUtils.isStringOrNumber(item)).forEach((item: any) => httpParams = httpParams.append(chave, item));
      } else if (FilmeFlixUtils.isStringOrNumber(valor)) {
        httpParams = httpParams.append(chave, valor.toString().trim());
      }
    });

    return httpParams;
  }

}
