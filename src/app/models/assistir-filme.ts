import { Ator } from './ator';
import { Avaliacao } from './avaliacao';
import { Filme } from './filme';

export class AssistirFilme extends Filme {

  linkExibicao?: string;
  atores?: Ator[] = [];
  avaliacoes?: Avaliacao[] = [];
  atoresTexto?: string;
  generosTexto?: string;
  avaliacaoUsuarioLogado?: Avaliacao;
  mediaAvaliacoes?: number = 0;
}
