import { BaseCrudEntity } from './base-crud-entity';

export class Ator extends BaseCrudEntity {
  sobrenome?: string;
  nomeCompleto?: string;
  dataNascimento?: string;
  idade?: number;
  textoSelect?: string;
}
