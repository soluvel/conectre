import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PropriedadeService } from "../propriedade.service";
import { Subject, takeUntil } from "rxjs";
import { EquipamentoService } from "../equipamento.service";

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.scss']
})
export class EquipamentoComponent implements OnInit, OnDestroy {
  form: FormGroup;
  propriedades: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private service: EquipamentoService,
    private propriedadeService: PropriedadeService) {
    this.form = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      propriedade: ['', Validators.required],
      codigo: ['', Validators.required],
      quantidade: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.propriedadeService.getPropriedades().subscribe(data => {
      this.propriedades = data;
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    this.form.get('propriedade').setValue(this.propriedades[0]);
    this.service.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.closeModal()
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }


  closeModal() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  }

  protected readonly onsubmit = onsubmit;
}
