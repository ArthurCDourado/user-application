import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../../../core/services/http/contato.service';

@Component({
  selector: 'app-contatos-list',
  templateUrl: './contatos-list.component.html',
  styleUrl: './contatos-list.component.css'
})
export class ContatosListComponent implements OnInit {

  constructor(private service: ContatoService) {}

  ngOnInit(): void {
    this.findAll();
  }

  private findAll() {
    this.service.getAll().subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { console.log('Do something else') }
    })
  }

}
