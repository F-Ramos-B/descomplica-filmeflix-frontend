import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/components/shared/base.component';
import { AssistirFilme } from 'src/app/models/assistir-filme';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-assistir-filme',
  templateUrl: './assistir.component.html',
  styleUrls: ['./assistir.component.scss']
})
export class AssistirFilmeComponent extends BaseComponent implements OnInit {

  filme: AssistirFilme;

  constructor(
    private filmeService: FilmeService
  ) {
    super();
  }

  ngOnInit(): void {
    console.log('carregando filme');

    this.filmeService.assistir(1).subscribe(filme => {
      this.filme = filme;
      console.log(this.filme);
    });
  }

}
