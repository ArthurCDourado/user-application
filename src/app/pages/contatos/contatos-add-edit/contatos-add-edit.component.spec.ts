import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContatosAddEditComponent } from './contatos-add-edit.component';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {ContatoService} from "../../../core/services/http/contato.service";

const mockService = jasmine.createSpyObj('ContatoService', ['getById', 'create', 'update']);
const mockRouter = jasmine.createSpyObj('Router', ['navigate']);


describe('ContatosAddEditComponent', () => {
  let component: ContatosAddEditComponent;
  let fixture: ComponentFixture<ContatosAddEditComponent>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => (key === 'id' ? '1' : null),
      },
      params: {id: 1},
    }
  } as unknown as ActivatedRoute;

  beforeEach(async () => {
    mockService.getById.and.returnValue(of({ id: 1, firstName: 'John' }));
    mockService.create.and.returnValue(of({}));
    mockService.update.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ContatosAddEditComponent],
      providers: [
        { provide: ContatoService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatosAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form on init', () => {
    expect(component.form.contains('firstName')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
  });

  it('should load contact by id on init', () => {
    component.ngOnInit();
    expect(mockService.getById).toHaveBeenCalledWith(1);
    expect(component.form.value.firstName).toBe('John');
  });

  it('should handle error on findById', () => {
    spyOn(console, 'log');
    mockService.getById.and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();
    expect(console.log).toHaveBeenCalledWith(new Error('Error'));
  });

  it('should call update when form has id', () => {
    spyOn(Swal, 'fire');
    component.form.setValue({ id: 1, firstName: 'Jane', email: 'jane@example.com', phone: '123456789' });

    component.salvar();

    expect(mockService.update).toHaveBeenCalledWith(component.form.getRawValue());
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Ação concluída com sucesso!' }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['contatos/list']);
  });

  it('should call create when form has no id', () => {
    spyOn(Swal, 'fire');
    component.form.setValue({ id: '', firstName: 'Jane', email: 'jane@example.com', phone: '123456789' });

    component.salvar();

    expect(mockService.create).toHaveBeenCalledWith(jasmine.objectContaining({ firstName: 'Jane' }));
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ title: 'Ação concluída com sucesso!' }));
    expect(mockRouter.navigate).toHaveBeenCalledWith(['contatos/list']);
  });

  it('should navigate to contacts list on goToList', () => {
    component.goToList();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['contatos/list']);
  });
});
