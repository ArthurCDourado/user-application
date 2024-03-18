import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../../core/services/http/contato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
    });
  }

  private findById(id: number) {
    this.service.getById(id).subscribe({
      next: (value) => { this.form.patchValue(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { }
    })
  }

  private update(contato: any) {
    this.service.update(contato).subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { this.goToList() }
    })
  }

  private create(contato: any) {
    this.service.create(contato).subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { this.goToList() }
    })
  }

  salvar() {
    const formData = this.form.getRawValue();

    !!formData.id ? this.update(formData) : this.create(formData);
  }

  goToList() {
    this.router.navigate(['contatos/list']);
  }
}
