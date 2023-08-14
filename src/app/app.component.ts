import { Component, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'descomplica-filmeflix-frontend';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.toastService.init();
  }

  ngOnInit() {
    this.router.navigate(this.authService.isAuthenticated() ? [''] : ['/login']);
  }
}
