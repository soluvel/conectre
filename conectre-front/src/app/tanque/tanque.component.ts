import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter, Subject, takeUntil } from "rxjs";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { EnumValueService } from "../enumValue.service";
import { TanqueNovoService } from "../tanqueNovo.service";

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
  produtor: any;
  propriedade: any;
  exibirTanque: boolean = false;
  tiposTanque = [];
  tiposAlimentacao = [];
  tiposAbastecimento = [];
  tiposEletrica = [];

  constructor(private formBuilder: FormBuilder,
              private enumValueService: EnumValueService,
              private tanqueService: TanqueNovoService,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      id: [],
      produtor: [],
      propriedade: [],
      tipoTanque: ['', Validators.required],
      area: ['', Validators.required],
      profundidadeMedia: ['', Validators.required],
      volume: ['', Validators.required],
      noAeradores: ['', Validators.required],
      potenciaAeracaoTotal: ['', Validators.required],
      tipoAlimentacao: ['', Validators.required],
      abastecimento: ['', Validators.required],
      maxAbastecimento: ['', Validators.required],
      redeEletrica: ['', Validators.required],
      produtorId: [''],
      propriedadeId: [''],
    });
  }

  ngOnInit() {

    this.route.paramMap.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.propriedade = navigation.extras.state['propriedade'];
      } else {
        this.propriedade = history.state.propriedade;
      }
    });

    this.enumValueService.getEnum("TipoTanque").pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.tiposTanque = response;
      },
      error: error => {
        console.error('Erro:', error);
      }
    });

    this.enumValueService.getEnum("Abastecimento").pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.tiposAbastecimento = response;
      },
      error: error => {
        console.error('Erro:', error);
      }
    });

    this.enumValueService.getEnum("RedeEletrica").pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.tiposEletrica = response;
      },
      error: error => {
        console.error('Erro:', error);
      }
    });

    this.enumValueService.getEnum("TipoAlimentacao").pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.tiposAlimentacao = response;
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPropriedade(): void {

  }

  onSubmit() {

    this.form.get('propriedadeId').setValue(1)
    this.form.get('produtorId').setValue(8)

    this.tanqueService.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        console.log("salvo com sucesso")
        this.router.navigate(['/lote/cadastrar']);

      },
      error: error => {
        console.error('Erro:', error);
      }
    });


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
