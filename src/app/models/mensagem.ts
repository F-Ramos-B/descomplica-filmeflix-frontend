export default class Mensagem<T = any> {
  mensagem: string;
  data?: T;
  dataHora?: string;
}
