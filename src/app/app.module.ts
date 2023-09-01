import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CSP_NONCE, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FilmesResultadosComponent } from './components/shared/filmes-resultados/filmes-resultados.component';
import { MensagemValidacaoComponent } from './components/shared/mensagem-validacao/mensagem-validacao.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroAtorComponent } from './pages/private/atores/cadastro/cadastro-ator.component';
import { AssistirFilmeComponent } from './pages/private/filmes/assistir/assistir-filme.component';
import { CadastroFilmeComponent } from './pages/private/filmes/cadastro/cadastro-filme.component';
import { PesquisarFilmeComponent } from './pages/private/filmes/pesquisar/pesquisar-filme.component';
import { HomeComponent } from './pages/private/home/home.component';
import { AssistirPlaylistComponent } from './pages/private/playlists/assistir/assistir-playlist.component';
import { CadastroPlaylistComponent } from './pages/private/playlists/cadastro/cadastro-playlist.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { SafePipe } from './pipes/safe-html.pipe';
import { TipoUsuarioPipe } from './pipes/tipo-usuario.pipe';
import { AdminService } from './services/admin.service';
import { AtorService } from './services/ator.service';
import { FilmeService } from './services/filme.service';
import { GeneroService } from './services/genero.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { PlataformaService } from './services/plataforma.service';
import { AvaliacoesComponent } from './components/shared/avaliacoes/avaliacoes.component';

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
    CadastroComponent,
    CadastroFilmeComponent,
    AssistirFilmeComponent,
    SafePipe,
    PesquisarFilmeComponent,
    FilmesResultadosComponent,
    HomeComponent,
    CadastroPlaylistComponent,
    AssistirPlaylistComponent,
    CadastroAtorComponent,
    AvaliacoesComponent
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
    DialogModule,
    MultiSelectModule,
    TabViewModule,
    PanelModule,
    DividerModule,
    AccordionModule
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
    AdminService,
    GeneroService,
    PlataformaService,
    FilmeService,
    {
      provide: CSP_NONCE,
      useValue: globalThis.myRandomNonceValue
    },
    AtorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
