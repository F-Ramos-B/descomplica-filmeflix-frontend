import { Ator } from './ator';
import { Avaliacao } from './avaliacao';
import { Filme } from './filme';

export class AssistirFilme extends Filme {

  linkExibicao?: string;
  atores?: Ator[] = [];
  avaliacoes?: Avaliacao[] = [];
  mediaAvaliacoes?: number = 0;
}
