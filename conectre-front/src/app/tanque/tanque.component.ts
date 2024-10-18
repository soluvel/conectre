import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumValueService } from "../enumValue.service";
import { TanqueNovoService } from "../tanqueNovo.service";

@Component({
  selector: 'app-tanque',
  templateUrl: './tanque.component.html',
  styleUrls: ['./tanque.component.scss']
})

export class TanqueComponent implements OnInit, OnDestroy  {

  isEditando: boolean = false;
  private destroy$ = new Subject<void>();
  exibirTanque: boolean = false;
  form: FormGroup;
  produtor: any;
  propriedade: any;
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
      produtorNome: [],
      propriedadeNome: [],
      nome: ['', Validators.required],
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
    const dados = JSON.parse(localStorage.getItem('propriedade')!);

    this.form.get('propriedadeId').setValue(dados.id);
    this.form.get('propriedadeNome').setValue(dados.nome);
    this.form.get('produtorId').setValue(dados.produtor);
    this.form.get('produtorNome').setValue(dados.produtorNome);

    this.form.get('area').valueChanges.subscribe(() => this.calcularVolume());
    this.form.get('profundidadeMedia').valueChanges.subscribe(() => this.calcularVolume());

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

  onSubmit() {
    this.tanqueService.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        console.log("salvo com sucesso")
        let tipoTanque = this.tiposTanque.filter(p => p.name == this.form.get('tipoTanque').value).map(p => p.description)[0]
        const dados = {
          produtor: this.form.get('propriedadeNome').value,
          propriedade: this.form.get('produtorNome').value,
          tanque: tipoTanque,
          tanqueNome: this.form.get('nome').value,
          tanqueId: response.id,
          area: response.area,
          potenciaAeracaoTotal: response.potenciaAeracaoTotal
        };

        localStorage.setItem('infoLote', JSON.stringify(dados));
        this.router.navigate(['/lote/cadastrar']);
        localStorage.removeItem('chave');

      },
      error: error => {
        console.error('Erro:', error);
      }
    });

  }

  calcularVolume() {
    let area = this.form.get('area').value;
    let profundidadeMedia = this.form.get('profundidadeMedia').value;

    if (area && profundidadeMedia) {
      area = area.replace(',', '.');
      profundidadeMedia = profundidadeMedia.replace(',', '.');

      const volume = parseFloat(area) * parseFloat(profundidadeMedia);
      this.form.get('volume').setValue(volume.toFixed(2));
    } else {
      this.form.get('volume').setValue(0);
    }
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
