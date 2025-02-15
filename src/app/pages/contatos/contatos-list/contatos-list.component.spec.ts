import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContatosListComponent } from './contatos-list.component';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {ContatoService} from "../../../core/services/http/contato.service";

const mockService = jasmine.createSpyObj('ContatoService', ['getAll', 'getByName', 'deleteById']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);


describe('ContatosListComponent', () => {
  let component: ContatosListComponent;
  let fixture: ComponentFixture<ContatosListComponent>;

  beforeEach(async () => {
    mockService.getAll.and.returnValue(of({ users: [] }));
    mockService.getByName.and.returnValue(of({ users: [] }));
    mockService.deleteById.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContatosListComponent],
      providers: [
        { provide: ContatoService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on init', () => {
    expect(component.form.contains('search')).toBeTrue();
  });

  it('should call findAll on init', () => {
    component.ngOnInit();
    expect(mockService.getAll).toHaveBeenCalled();
  });

  it('should search contacts by name', () => {
    const event = { target: { value: 'John' } };
    component.findByName(event);
    expect(mockService.getByName).toHaveBeenCalledWith('John');
  });

  it('should handle error on search', () => {
    spyOn(console, 'log');
    mockService.getByName.and.returnValue(throwError(() => new Error('Error')));
    const event = { target: { value: 'John' } };

    component.findByName(event);
    expect(console.log).toHaveBeenCalledWith(new Error('Error'));
  });

  it('should delete contact by id and refresh list', () => {
    spyOn(Swal, 'fire');
    component.deleteById(1);

    expect(mockService.deleteById).toHaveBeenCalledWith(1);
    expect(mockService.getAll).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Ação concluída com sucesso!' }));
  });

  it('should navigate to create page', () => {
    component.goToCreate();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['contatos/add']);
  });

  it('should navigate to edit page with correct id', () => {
    component.goToEdit(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['contatos/edit', 1]);
  });
});
