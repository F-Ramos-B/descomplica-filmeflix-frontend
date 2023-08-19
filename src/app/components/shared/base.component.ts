import { Injectable, OnDestroy } from '@angular/core';
import { convert } from '@js-joda/core';
import { PrimeIcons } from 'primeng/api';
import { Subject } from 'rxjs';

import { ToastService } from './../../services/toast.service';

@Injectable()
export abstract class BaseComponent implements OnDestroy {

  protected readonly PrimeIcons = PrimeIcons;
  protected readonly dateConverter = convert;
  protected readonly ngUnsubscribe$ = new Subject();

  protected toastSucesso(detail: string) {
    ToastService.getInstance().sucesso(detail);
  }

  protected toastAviso(detail: string) {
    ToastService.getInstance().aviso(detail);
  }

  protected toastErro(detail: string) {
    ToastService.getInstance().erro(detail);
  }

  protected toastMensagem(summary: string, detail: string, severity: string) {
    ToastService.getInstance().mensagem(summary, detail, severity);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.complete();
  }

}
