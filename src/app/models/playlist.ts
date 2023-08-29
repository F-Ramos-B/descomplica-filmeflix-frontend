import { Avaliacao } from './avaliacao';
import { Filme } from './filme';
import { Usuario } from './usuario';

export class Playlist {

  id?: number;
  nome?: string;
  filmes?: Filme[] = [];
  avaliacoes?: Avaliacao[] = [];
  criador?: Usuario;
  createdAt?: string;
  updatedAt?: string;

}
