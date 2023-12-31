import { BaseCrudEntity } from './base-crud-entity';
import { Plataforma } from './plataforma';

export class Filme {
  id?: number;
  titulo?: string;
  anoPublicacao?: number;
  tituloAnoPublicacao?: string;
  descricao?: string;
  numeroVisualizacoes?: number;
  linkImagem?: string;
  linkFilme?: string;
  classificacaoIndicativa?: number;
  createdAt?: string;
  updatedAt?: string;
  generos?: BaseCrudEntity[] = [];
  plataforma?: Plataforma;
  dataInclusaoPlaylist?: string;
}
