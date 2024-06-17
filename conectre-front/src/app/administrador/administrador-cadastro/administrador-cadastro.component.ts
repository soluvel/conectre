import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: AdministradorService) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: ['', Validators.required],
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
    if (this.admId != null) {
      this.service.getAdministrador(this.admId).subscribe(data => {
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
  }

  handleImageUpload($event: Event) {

  }

  onSubmmit() {
    this.form.get('empresa').setValue(this.empresaId);

    this.service.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.closeModal()
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }
}
