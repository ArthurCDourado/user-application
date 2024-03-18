import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../../core/services/http/contato.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import moment from 'moment';

@Component({
  selector: 'app-contatos-add-edit',
  templateUrl: './contatos-add-edit.component.html',
  styleUrl: './contatos-add-edit.component.css'
})
export class ContatosAddEditComponent implements OnInit {

  form!: FormGroup;

  contatoId: number = 0;

  files: any[] = [];

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

  async getBase64(file: File) {
    var fileReader = new FileReader();
    if (file) {
        fileReader.readAsDataURL(file);
    }
    return new Promise((resolve, reject) => {
      fileReader.onload = function(event) {
        resolve(event.target?.result);
      };
    })
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private creatForm(): void {
    this.form = this.fb.group({
      id: [''],
      nome: [''],
      email: [''],
      telefone: ['']
    });
  }

  private findById(id: number) {
    this.service.getById(id).subscribe({
      next: (contato) => {
        if (!!contato.foto) {
          this.files.push(this.dataURLtoFile(contato.foto, 'file'))
        }
        this.form.patchValue(contato)
       },
      error: (err) => { console.log(err) }, 
      complete: () =>  { }
    })
  }

  dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
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

  async salvar() {
    let formData = this.form.getRawValue();

    formData.foto = await this.getBase64(this.files[0]);

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
