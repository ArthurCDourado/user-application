import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContatoService } from '../../../core/services/http/contato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contatos-add-edit',
  templateUrl: './contatos-add-edit.component.html',
  styleUrl: './contatos-add-edit.component.css'
})
export class ContatosAddEditComponent implements OnInit {

  form!: FormGroup;

  constructor(private route: ActivatedRoute, private service: ContatoService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // console.log(this.route.snapshot.params['id']);

    this.creatForm();
  }

  private creatForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  private findById(id: number) {
    this.service.getById(id).subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { console.log('Do something else') }
    })
  }

  private update(contato: any) {
    this.service.update(contato).subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { console.log('Do something else') }
    })
  }

  private create(contato: any) {
    this.service.create(contato).subscribe({
      next: (value) => { console.log(value) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { console.log('Do something else') }
    })
  }

  salvar() {
    const formData = this.form.getRawValue();

    !!formData.id ? this.update(formData) : this.create(formData);
  }

}
