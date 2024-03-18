import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../../../core/services/http/contato.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contatos-list',
  templateUrl: './contatos-list.component.html',
  styleUrl: './contatos-list.component.css'
})
export class ContatosListComponent implements OnInit {

  contatos: any = []

  constructor(private service: ContatoService,
              private router: Router) {}

  ngOnInit(): void {
    this.findAll();
  }

  private findAll() {
    this.service.getAll().subscribe({
      next: (value) => { 
        this.contatos = value 
      },
      error: (err) => { console.log(err) }, 
      complete: () =>  { }
    })
  }

  deleteById(id: number) {
    this.service.deleteById(id).subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { 
        Swal.fire({
          title: "Ação concluída com sucesso!",
          icon: "success"
        });
        this.findAll();
       }
    })
  }

  goToCreate() {
    this.router.navigate(['contatos/add']);
  }

  goToEdit(id: number) {
    this.router.navigate(['contatos/edit', id]);
  }
}
