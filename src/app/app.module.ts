import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MensagemValidacaoComponent } from './components/shared/mensagem-validacao/mensagem-validacao.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { TipoUsuarioPipe } from './pipes/tipo-usuario.pipe';
import { HttpInterceptorService } from './services/http-interceptor.service';

export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    MensagemValidacaoComponent,
    TipoUsuarioPipe,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StyleClassModule,
    FormsModule,
    MenubarModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    CardModule,
    MessagesModule,
    MessageModule,
    ButtonModule,
    SelectButtonModule,
    InputNumberModule,
    CalendarModule,
    InputTextModule,
    MenubarModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    InputTextareaModule,
    CardModule,
    RatingModule,
    DialogModule
  ],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuard,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
