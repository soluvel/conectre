import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { AdministradorService } from "../administrador.service";

@Component({
  selector: 'app-administrador-cadastro',
  templateUrl: './administrador-cadastro.component.html',
  styleUrls: ['./administrador-cadastro.component.scss']
})
export class AdministradorCadastroComponent implements OnInit, OnDestroy, OnChanges {
  @Input() admId: any;
  form: FormGroup;
  empresaId: any;
  private destroy$ = new Subject<void>();
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: AdministradorService) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      celular: ['', Validators.required],
      empresa: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.empresaId = params.get('id');
    });

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['admId'].currentValue != null) {
      this.service.getAdministrador(changes['admId'].currentValue).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeModal() {
    var overlay = document.getElementById('overlayAdm');
    overlay.style.display = 'none';

    var filterWall = document.getElementById('filter-wall');
    filterWall.style.display = 'none';
  }

  handleImageUpload($event: Event) {

  }

  onSubmit() {
    this.form.get('empresa').setValue(this.empresaId);

    this.service.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.closeModal();
        this.onSave.emit();
      },
      error: error => {
        console.error('Erro:', error);
      }
    });

    this.form.reset();
  }
}
