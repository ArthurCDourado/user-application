import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/http/auth.service';
import { StorageService } from '../../../core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.creatForm();
  }

  private creatForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  
  login() {
    const formValue = this.form.getRawValue();

    this.authService.login(formValue.username, formValue.password)
        .subscribe({
                next: (response) => {
                    this.storageService.token = response.token;
                  
                    this.goToContatos();
                },
                error: (e) => {
                    console.log(e);
                }
            }
        );
  }

  goToContatos() {
    this.router.navigate(['contatos/list']);
  }
}
