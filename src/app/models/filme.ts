import { BaseCrudEntity } from './base-crud-entity';
import { Plataforma } from './plataforma';

export class Filme {
  id?: number;
  titulo?: string;
  descricao?: string;
  numeroVisualizaoes?: number;
  linkImagem?: string;
  linkFilme?: string;
  classificacaoIndicativa?: number;
  createdAt?: string;
  updatedAt?: string;
  generos?: BaseCrudEntity[] = [];
  plataforma?: Plataforma;
}
