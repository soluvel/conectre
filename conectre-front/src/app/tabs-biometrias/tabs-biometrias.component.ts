import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { StorageService } from "../storage.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MedicaoService } from "../produtor/medicao.service";
import { Subject, takeUntil } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { PropriedadeService } from "../produtor/propriedade.service";
import { TanqueService } from "../tanque.service";

@Component({
  selector: 'app-tabs-biometrias',
  templateUrl: './tabs-biometrias.component.html',
  styleUrls: ['./tabs-biometrias.component.scss']
})
export class TabsBiometriasComponent implements OnInit, OnDestroy{

  @Input() tanqueId: any;
  @Input() medicao: any;
  @Output() tanque = new EventEmitter<any>();
  @Output() data = new EventEmitter<any>();

  form: FormGroup;
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
              private medicaoService: MedicaoService) {
    this.form = this.formBuilder.group({
      id: [],
      tanque: this.formBuilder.group({
        id: [''],
      }),
      agua: this.formBuilder.group({
        dtAgua: [''],
        hrAgua: [''],
        pH: [''],
        amonia: [''],
        nitrito: [''],
        alcalinidade: [''],
        transparencia: [''],
        oxigenioAgua: [''],
        temperaturaAgua: ['']
      }),
      biometria: this.formBuilder.group({
        id: [''],
        dtBiometria: [''],
        hrBiometria: [''],
        qntAmostra: [''],
        mortalidade: [''],
        mortalidadeAcumulada: [''],
        qntPeixe: [''],
        pesoMedio: [''],
        BiomassaTotal: [''],
        ganhoPeso: [''],
        racaoTotal: [''],
        ca: [''],
        gpd: [''] 
      }),
      trato: this.formBuilder.group({
        id: [''],
        dtTrato: [''],
        hrTrato: [''],
        temperaturaTrato: [''],
        oxigenioTrato: [''],
        racaoOfertada: [''],
        racaoTotal: [''],
        racaoRestante: ['']
      }),
      estoque: this.formBuilder.group({
        id: [''],
        dtRecebimento: [''],
        qtdRecebida: [''],
        tipoRacao: [''],
        nrmNota: ['']
      }),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.propriedade.getPropriedades().subscribe(data => {
      this.propriedades = data;
    })


    if (this.tanqueId) {
      this.medicaoService.findOneByTanque(parseInt(this.tanqueId)).subscribe(data => {
        this.form.patchValue(data);
      });
    }

    if (this.medicao != '') {
      this.medicaoService.findOne(parseInt(this.medicao)).subscribe(data => {
        this.form.patchValue(data);
        this.tanque.emit(this.form.get('tanque').value.id)
        this.data.emit(this.form.get('peixe').value.dtColeta)
      });
    }

    const url = this.route.snapshot.url.join('/');
    if (url.includes('inicio')) {
      this.observacao = false;
    }

    if (url.includes('historico')) {
      this.historico = true;
    }
  }

  onSubmit() {
    this.form.get('tanque.id').setValue(this.tanqueId);
    this.medicaoService.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
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
