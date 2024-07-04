import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from "../storage.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MedicaoService } from "../produtor/medicao.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-tabs-tanque',
  templateUrl: './tabs-tanque.component.html',
  styleUrls: ['./tabs-tanque.component.scss']
})
export class TabsTanqueComponent implements OnInit, OnDestroy {

  @Input() tanqueId: any;
  form: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(public storage: StorageService,
              private formBuilder: FormBuilder,
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
    this.medicaoService.findOneByTanque(parseInt(this.tanqueId)).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  onSubmit() {
    this.form.get('tanque.id').setValue(this.tanqueId);
    this.medicaoService.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }
}
