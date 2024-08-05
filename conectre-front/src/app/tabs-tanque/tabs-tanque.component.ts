import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StorageService } from "../storage.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MedicaoService } from "../produtor/medicao.service";
import { Subject, takeUntil } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-tabs-tanque',
  templateUrl: './tabs-tanque.component.html',
  styleUrls: ['./tabs-tanque.component.scss']
})
export class TabsTanqueComponent implements OnInit, OnDestroy{

  @Input() tanqueId: any;
  @Input() medicao: any;
  form: FormGroup;
  private destroy$ = new Subject<void>();
  observacao: boolean = true;
  historico: boolean = false;

  constructor(public storage: StorageService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private medicaoService: MedicaoService) {
    this.form = this.formBuilder.group({
      id: [],
      tanque: this.formBuilder.group({
        id: [''],
      }),
      peixe: this.formBuilder.group({
        dtColeta: [''],
        hrColeta: [''],
        qntAmostra: [''],
        volume: [''],
        mortalidade: [''],
        pesoMedio: [''],
        biomassa: [''],
        ganhoPeso: [''],
        kgRacaoOfertada: ['']
      }),
      ambiente: this.formBuilder.group({
        id: [''],
        dtColeta: [''],
        hrColeta: [''],
        ph: [''],
        amonia: [''],
        nitrito: [''],
        alcalinidade: [''],
        transparenciaAgua: [''],
        temperatura: [''],
        oxigenio: ['']
      }),
      racao: this.formBuilder.group({
        id: [''],
        dtColeta: [''],
        hrColeta: [''],
        temperatura: [''],
        oxigenio: [''],
        racaoTrato: [''],
        racaoTotal: ['']
      }),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    if (this.tanqueId != '') {
      this.medicaoService.findOneByTanque(parseInt(this.tanqueId)).subscribe(data => {
        this.form.patchValue(data);
      });
    }

    if (this.medicao != '') {
      this.medicaoService.findOne(parseInt(this.medicao)).subscribe(data => {
        this.form.patchValue(data);
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

  sendMessage() {

  }

  openMessageBox() {
    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'block';

    var overlay = document.getElementById('overlayObservacao');
    overlay.style.display = 'block';
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
