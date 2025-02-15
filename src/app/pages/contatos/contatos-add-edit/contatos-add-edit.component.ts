import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../../core/services/http/contato.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contatos-add-edit',
  templateUrl: './contatos-add-edit.component.html',
  styleUrl: './contatos-add-edit.component.css'
})
export class ContatosAddEditComponent implements OnInit {

  form!: FormGroup;

  contatoId: number = 0;

  constructor(private route: ActivatedRoute,
              private service: ContatoService,
              private fb: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.creatForm();

    this.contatoId = this.route.snapshot.params['id']
    if (!!this.contatoId) {
      this.findById(this.contatoId)
    }
  }

  private creatForm(): void {
    this.form = this.fb.group({
      id: [''],
      firstName: [''],
      email: [''],
      phone: ['']
    });
  }

  private findById(id: number) {
    this.service.getById(id).subscribe({
      next: (contato) => {
        this.form.patchValue(contato)
       },
      error: (err) => { console.log(err) }, 
      complete: () =>  { }
    })
  }

  private update(contato: any) {
    this.service.update(contato).subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { 
        Swal.fire({
          title: "Ação concluída com sucesso!",
          icon: "success"
        });
        this.goToList()
       }
    })
  }

  private create(contato: any) {
    this.service.create(contato).subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { 
        Swal.fire({
          title: "Ação concluída com sucesso!",
          icon: "success"
        });
        this.goToList()
       }
    })
  }

  salvar() {
    let formData = this.form.getRawValue();

    if (!!formData.id) {
      this.update(formData)
      return;
    }

    delete formData.id
    this.create(formData)
  }

  goToList() {
    this.router.navigate(['contatos/list']);
  }
}
