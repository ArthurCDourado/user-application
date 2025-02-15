import { Component, OnInit } from '@angular/core';
import { ContatoService } from '../../../core/services/http/contato.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contatos-list',
  templateUrl: './contatos-list.component.html',
  styleUrl: './contatos-list.component.css'
})
export class ContatosListComponent implements OnInit {

  form!: FormGroup;

  contatos: any = []

  constructor(private service: ContatoService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.creatForm();
    this.findAll();
  }

  private creatForm(): void {
    this.form = this.fb.group({
      search: ['']
    });
  }

  findByName(event: any) {
    this.service.getByName(event.target.value).subscribe({
      next: (resp) => {
        this.contatos = resp.users
       },
      error: (err) => { console.log(err) }, 
      complete: () =>  { }
    })
  }

  private findAll() {
    this.service.getAll().subscribe({
      next: (resp) => { 
        this.contatos = resp.users
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
