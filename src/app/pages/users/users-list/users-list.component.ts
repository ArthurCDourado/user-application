import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  pagination: any = { results: 10 }

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.findAll(this.pagination);
  }

  private findAll(params: any) {
    this.service.getAll(params).subscribe({
      next: (value) => { console.log(value.results) },
      error: (err) => { console.log(err) }, 
      complete: () =>  { console.log('Do something else') }
    })
  }

}
