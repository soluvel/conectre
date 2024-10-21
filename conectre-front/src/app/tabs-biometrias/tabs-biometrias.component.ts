import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { MedicaoService } from "../produtor/medicao.service";
import { PropriedadeService } from "../produtor/propriedade.service";
import { StorageService } from "../storage.service";
import { TanqueService } from "../tanque.service";
import { MedicaoNovoService } from '../produtor/medicao-novo.service';

@Component({
  selector: 'app-tabs-biometrias',
  templateUrl: './tabs-biometrias.component.html',
  styleUrls: ['./tabs-biometrias.component.scss']
})
export class TabsBiometriasComponent implements OnInit, OnDestroy {

  @Input() tanqueId: any;
  @Input() medicao: any;
  @Output() tanque = new EventEmitter<any>();
  @Output() data = new EventEmitter<any>();

  form: FormGroup;
  formAgua: FormGroup;
  formBiometria: FormGroup;
  formTrato: FormGroup;
  formEstoque: FormGroup;

  private destroy$ = new Subject<void>();
  observacao: boolean = true;
  historico: boolean = false;
  propriedades: any[];
  propriedadeSelecionada: any;
  nomeTanque: any;

  itemsAgua = ['Data', 'Hora', 'pH', 'Amônia (NH3)', 'Nitrito (NO2)', 'Alcalinidade', 'Transparência (cm)', 'Oxigênio (mg/L)', 'Temperatura (ºC)'];
  selectedItemAgua: string | null = null;

  itemsBiometria = ['Data', 'Hora', 'Peixe/amostra', 'Mortalidade', 'Mortalidade acumulada', 'Qtde. Peixes', 'Peso médio', 'Biomassa total', 'Ganho de peso', 'Ração total', 'C.A', 'GPD'];
  selectedItemBiometria: string | null = null;

  itemsTrato = ['Data', 'Hora', 'Temperatura (ºC)', 'Oxigênio (mg/L)', 'Ração ofertada (Kg)', 'Ração total despejada (Kg)', 'Ração restante no silo'];
  selectedItemTrato: string | null = null;

  itemsEstoque = ['Data de recebimento', 'Qtde. recebida (Kg)', 'Tipo da ração', 'Nº da nota'];
  selectedItemEstoque: string | null = null;

  constructor(public storage: StorageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private propriedade: PropriedadeService,
    private tanqueService: TanqueService,
    private medicaoService: MedicaoService,
    private medicaoNovoService: MedicaoNovoService) {
    this.form = this.formBuilder.group({
      id: [''],
      tanqueId: [''],
      dtMedicao: [''],
      aguas: this.formBuilder.array([]),
      biometrias: this.formBuilder.array([]),
      tratos: this.formBuilder.array([]),
      estoques: this.formBuilder.array([])
    });

    this.formAgua = this.formBuilder.group({
      dtMedicao: [''],
      hora: [''],
      ph: [''],
      amonia: [''],
      nitrito: [''],
      alcalinidade: [''],
      transparencia: [''],
      oxigenio: [''],
      temperatura: ['']
    });

    this.formBiometria = this.formBuilder.group({
      id: [''],
      dtMedicao: [''],
      hora: [''],
      peixePorAmostra: [''],
      mortalidade: [''],
      mortalidadeAcumulada: [''],
      qntPeixe: [''],
      pesoMedio: [''],
      biomassaTotal: [''],
      ganhoPeso: [''],
      racaoTotal: [''],
      ca: [''],
      gpd: ['']
    });

    this.formTrato = this.formBuilder.group({
      id: [''],
      dtMedicao: [''],
      hora: [''],
      temperatura: [''],
      oxigenio: [''],
      racaoOfertada: [''],
      racaoTotalDespejada: [''],
      racaoRestanteSilo: ['']
    });

    this.formEstoque = this.formBuilder.group({
      id: [''],
      dtRecebimento: [''],
      qtdRecebida: [''],
      tipoRacao: [''],
      nrmNf: ['']
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {

  }

  get aguas(): FormArray {
    return this.form.get('aguas') as FormArray;
  }

  get biometrias(): FormArray {
    return this.form.get('biometrias') as FormArray;
  }

  get tratos(): FormArray {
    return this.form.get('tratos') as FormArray;
  }

  get estoques(): FormArray {
    return this.form.get('estoques') as FormArray;
  }

  isFormNotEmpty(form: FormGroup): boolean {
    return Object.values(form.value).some(value => value !== null && value !== '');
  }

  addAgua(): void {
    this.aguas.push(this.formAgua);
  }

  addBiometria(): void {
    this.biometrias.push(this.formBiometria);
  }

  addTrato(): void {
    this.tratos.push(this.formTrato);
  }

  addEstoque(): void {
    this.estoques.push(this.formEstoque);
  }

  onSubmitNovo(): void {

    if (this.isFormNotEmpty(this.formAgua)) {
      this.addAgua();
    }

    if (this.isFormNotEmpty(this.formTrato)) {
      this.addTrato();
    }

    if (this.isFormNotEmpty(this.formBiometria)) {
      this.addBiometria();
    }

    if (this.isFormNotEmpty(this.formEstoque)) {
      this.addEstoque();
    }


    this.form.get('tanqueId').setValue(this.tanqueId);
    this.medicaoNovoService.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        window.location.reload();
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }


  submitPropriedade() {
    const form = this.formBuilder.group({
      nome: [],
      propriedadeId: []
    });

    form.get('nome').setValue(this.nomeTanque);
    form.get('propriedadeId').setValue(this.propriedadeSelecionada);

    this.tanqueService.save(form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.router.navigate(['/inicio']);
      },
      error: error => {
        console.error('Erro:', error);
      }
    });

    this.closeConfirm();
    window.location.reload();
  }


  openMessageBox() {
    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'block';

    var overlay = document.getElementById('overlayObservacao');
    overlay.style.display = 'block';
  }

  selectItemAgua(itemAgua: string): void {
    this.selectedItemAgua = itemAgua;
  }

  selectItemBiometria(itemBiometria: string): void {
    this.selectedItemBiometria = itemBiometria;
  }

  selectItemTrato(itemTrato: string): void {
    this.selectedItemTrato = itemTrato;
  }

  selectItemEstoque(itemEstoque: string): void {
    this.selectedItemEstoque = itemEstoque;
  }

  openOverlayTanque() {
    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'block';

    var overlay = document.getElementById('overlayNovoTanque');
    overlay.style.display = 'block';
  }

  closeConfirm() {
    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'none';

    try {
      var overlay = document.getElementById('overlayObservacao');
      overlay.style.display = 'none';
    } catch (error) {
    }

    try {
      var overlay = document.getElementById('overlayNovoTanque');
      overlay.style.display = 'none';
    } catch (error) {
    }
  }
}
