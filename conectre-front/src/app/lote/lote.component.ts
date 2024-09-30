import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss']
})
export class LoteComponent implements OnInit, OnDestroy  {

  isEditando: boolean = false;
  propriedadeId: any;
  private destroy$ = new Subject<void>();
  msgButton: string;
  form: FormGroup;
  produtores: any;
  exibirTanque: boolean = false;

  constructor(private formBuilder: FormBuilder,
              // private service: PropriedadeService,
              // private produtorService: ProdutorService,
              // private excelService: ExcelService,
              private toastr: ToastrService,
              // private viaCepService: ViaCepService,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      id: [],      
      tanque: ['', Validators.required],
      lote: ['', Validators.required],
      ciclo: ['', Validators.required],
      tipoTanque: ['', Validators.required],
      area: ['', Validators.required],
      aeracaoTotal: ['', Validators.required],
      especie: ['', Validators.required],
      origem: ['', Validators.required],
      dataAlojamento: ['', Validators.required],
      primeiraRemessa: ['', Validators.required],
      mortalidadeAlojamento: ['', Validators.required],
      segundaRemessa: ['', Validators.required],
      pesoMedio: ['', Validators.required],
      biomassaAlojada: ['', Validators.required],
      densidade: ['', Validators.required],
      biomassaCVAtual: ['', Validators.required],
      PesoAbateEsperado: ['', Validators.required],
      biomassaEstimada: ['', Validators.required],
    });
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPropriedade(): void {
    
  }

  onSubmit() {
    
  }


  getEnderecoViaCep() {

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
