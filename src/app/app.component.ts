import { Component } from '@angular/core';
import { ToastService } from './services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'descomplica-filmeflix-frontend';

  constructor(
    private toastService: ToastService,
    private router: Router
  ) {
    this.toastService.init();
  }
}
