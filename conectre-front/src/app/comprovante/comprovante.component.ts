import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { ComprovanteService } from './comprovante.service';

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.scss']
})
export class ComprovanteComponent implements OnInit, OnDestroy {

  isEditando: boolean = false;
  propriedadeId: any;
  private destroy$ = new Subject<void>();
  msgButton: string;
  form: FormGroup;
  produtores: any;
  tanqueAlocado: string;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: ComprovanteService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this.formBuilder.group({
      id: [],
      data: ['', Validators.required],
      saida: ['', Validators.required],
      entrada: ['', Validators.required],
      temperaturaAgua: ['', Validators.required],
      oxigenio: ['', Validators.required],
      placaVeiculo: ['', Validators.required],
      numeroCaixas: ['', Validators.required],
      peixePorCaixa: ['', Validators.required],
      pesoMedio: ['', Validators.required],
      pesoTotal: ['', Validators.required],
      numeroLacre: ['', Validators.required],
      loteId: [''],
    });
  }

  ngOnInit() {
    const dados = JSON.parse(localStorage.getItem('infoLote')!);
    this.tanqueAlocado = dados.tanqueNome;
    this.form.get('loteId').setValue(localStorage.getItem('lote'))
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
     this.service.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        console.log("salvo com sucesso");
        this.router.navigate(['/inicio']);
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }

  enableEdit(inputId: string): void {
    const allInputs = document.querySelectorAll('.form-control');
    const editingInput = document.getElementById(inputId);

    allInputs.forEach(input => {
      if (input !== editingInput) {
        input.classList.add('click-disabled');
        input.classList.remove('focus-editing-input');
      }
    });

    editingInput.classList.toggle('click-disabled');
    editingInput.classList.toggle('focus-editing-input');
  }

  openPopup() {
    var overlay = document.getElementById('overlaySuccessRegister');
    overlay.style.display = 'block';

    var popupWall = document.getElementById('popupWall');
    popupWall.style.display = 'block';
  }

  closePopup() {
    var overlay = document.getElementById('overlaySuccessRegister');
    overlay.style.display = 'none';

    var popupWall = document.getElementById('popupWall');
    popupWall.style.display = 'none';
  }

}
