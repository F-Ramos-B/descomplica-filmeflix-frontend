import { Avaliacao } from './avaliacao';
import { Filme } from './filme';
import { Usuario } from './usuario';

export class Playlist {

  id?: number;
  nome?: string;
  descricao?: string;
  linkImagem?: string;
  filmes?: Filme[] = [];
  avaliacoes?: Avaliacao[] = [];
  avaliacaoUsuarioLogado: Avaliacao;
  criador?: Usuario;
  createdAt?: string;
  updatedAt?: string;

}
