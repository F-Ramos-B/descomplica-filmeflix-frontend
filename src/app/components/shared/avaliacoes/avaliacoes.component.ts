import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Avaliacao } from 'src/app/models/avaliacao';
import { FormUtils } from 'src/app/utils/form-utils';

import { BaseComponent } from '../base.component';


@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.scss']
})
export class AvaliacoesComponent extends BaseComponent implements OnInit {

  @Input() idFilme: number;
  @Input() idPlaylist: number;
  @Input({ required: true }) avaliacoes: Array<Avaliacao>;
  @Input({ required: true }) avaliacaoUsuarioLogado: Avaliacao;
  @Output() onAvaliacaoPostada = new EventEmitter<Avaliacao>();

  formulario: FormGroup = new FormGroup({
    nota: new FormControl(null, Validators.required),
    critica: new FormControl(null, [Validators.required, Validators.maxLength(2048)]),
    idFilme: new FormControl(null),
    idPlaylist: new FormControl(null)
  });

  ngOnInit(): void {
    const idRecurso = this.idFilme || this.idPlaylist;
    this.formulario.get(this.idFilme ? 'idFilme' : 'idPlaylist').patchValue(idRecurso);
  }

  validate() {
    FormUtils.forceValidateForm(this.formulario, this.postarAvaliacao.bind(this));
  }

  postarAvaliacao() {
    this.onAvaliacaoPostada.emit(this.formulario.value);
  }

}
