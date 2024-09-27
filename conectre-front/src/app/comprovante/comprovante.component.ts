import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-comprovante',
  templateUrl: './comprovante.component.html',
  styleUrls: ['./comprovante.component.scss']
})
export class ComprovanteComponent implements OnInit, OnDestroy  {

  isEditando: boolean = false;
  propriedadeId: any;
  private destroy$ = new Subject<void>();
  msgButton: string;
  form: FormGroup;
  produtores: any;

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
      data: ['', Validators.required],
      saida: ['', Validators.required],
      entrada: ['', Validators.required],
      temperaturaAgua: ['', Validators.required],
      oxigenio: ['', Validators.required],
      placaVeiculo: ['', Validators.required],
      numeroCaixas: ['', Validators.required],
      peixePorCaixa: ['', Validators.required],
      pesoMedio: ['', Validators.required],
      tanqueAlocado: ['', Validators.required],
      pesoTotal: ['', Validators.required],
      numeroLacre: ['', Validators.required],
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

}
