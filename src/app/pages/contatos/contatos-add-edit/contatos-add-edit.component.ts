import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contatos-add-edit',
  templateUrl: './contatos-add-edit.component.html',
  styleUrl: './contatos-add-edit.component.css'
})
export class ContatosAddEditComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
  }

}
