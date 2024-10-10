import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { LoteService } from "../lote.service";

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss']
})
export class LoteComponent implements OnInit, OnDestroy {

  isEditando: boolean = false;
  private destroy$ = new Subject<void>();
  form: FormGroup;
  produtorNome: string;
  propriedade: string;
  tanque: string
  area: string
  potenciaAeracaoTotal: string

  constructor(private formBuilder: FormBuilder,
              private service: LoteService,
              // private produtorService: ProdutorService,
              // private excelService: ExcelService,
              private toastr: ToastrService,
              // private viaCepService: ViaCepService,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      id: [],
      tanque: [],
      tanqueId: [],
      especie: ['', Validators.required],
      origem: ['', Validators.required],
      dataAlojamento: ['', Validators.required],
      qtdRecebida: ['', Validators.required],
      mortalidade: ['', Validators.required],
      qtdRecebida2: ['', Validators.required],
      pesoMedio: ['', Validators.required],
      biomassaTotal: ['', Validators.required],
      densidade: ['', Validators.required],
      biomassaCVAtual: ['', Validators.required],
      pesoAbateEsperado: ['', Validators.required],
      biomassaEstimadaFinal: ['', Validators.required],
    });
  }

  ngOnInit() {
    const dados = JSON.parse(localStorage.getItem('infoLote')!);

    this.produtorNome = dados.produtor;
    this.propriedade = dados.propriedade;
    this.tanque = dados.tanque;
    this.area = dados.area;
    this.potenciaAeracaoTotal = dados.potenciaAeracaoTotal;
    this.form.get('tanqueId').setValue(dados.tanqueId)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {

    this.service.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        console.log("salvo com sucesso")
        localStorage.setItem('lote', response.id);
        this.router.navigate(['/checklist']);

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
