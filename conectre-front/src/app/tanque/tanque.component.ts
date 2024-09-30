import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-tanque',
  templateUrl: './tanque.component.html',
  styleUrls: ['./tanque.component.scss']
})

export class TanqueComponent implements OnInit, OnDestroy  {

  isEditando: boolean = false;
  propriedadeId: any;
  private destroy$ = new Subject<void>();
  msgButton: string;
  form: FormGroup;
  produtores: any;
  exibirTanque: boolean = false;
  tiposTanque = ['Escavado', 'Geomembrana', 'Elevado', 'Concreto', 'Outro'];
  tiposAlimentacao = ['Manual', 'Alimentador Arrasto', 'Alimentador Automático', 'Outro'];
  tiposAbastecimento = ['Bombeamento', 'Gravidade', 'Chuva', 'Outro'];
  tiposEletrica = ['Monofásica 127V', 'Monofásica 220V', 'Monofásica 127V e 220V', 'Trifásica 220V', 'Trifásica 380V', 'Trifásica 220V e 380V', 'Outro'];

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
      nomeTanque: ['', Validators.required],
      tipoTanque: ['', Validators.required],
      area: ['', Validators.required],
      profundidadeMedia: ['', Validators.required],
      volume: ['', Validators.required],
      nmrAeradores: ['', Validators.required],
      potenciaAeracaoTotal: ['', Validators.required],
      tipoAlimentacao: ['', Validators.required],
      abastecimento: ['', Validators.required],
      maxAbastecimento: ['', Validators.required],
      redeEletrica: ['', Validators.required],
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
