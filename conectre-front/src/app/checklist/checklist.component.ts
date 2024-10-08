import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { ChecklistService } from './checklist.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit, OnDestroy {

  isEditando: boolean = false;
  isEditandoEspecific: boolean = false;
  propriedadeId: any;
  private destroy$ = new Subject<void>();
  msgButton: string;
  form: FormGroup;
  produtores: any;
  exibirTanque: boolean = false;
  numbers = [];
  itens = [
    ['Atendimento das Orientações técnicas', 0],
    ['Materiais e Equipamentos', 0],
    ['Limpeza ao redor dos tanques', 0],
    ['Identificação dos tanques e silos', 0],
    ['Condições do acesso aos tanques', 0],
  ]
  collectedData: any[] = [];
  constructor(private formBuilder: FormBuilder,
    private service: ChecklistService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this.formBuilder.group({
      id: [],
      sentence: [''],
      note: [''],
      lote: [''],
    });
  }

  ngOnInit() {
    this.fillNumbers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit() {
    let loteId = Number(localStorage.getItem('lote'));
    const checklistItems: ChecklistItem[] = this.itens.map(item => ({
      sentence: item[0].toString(),
      note: item[1].toString(),
      loteId: loteId
    }));

    const checklists = { checks: checklistItems };
    this.service.save(checklists).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
       console.log("salvo com sucesso");
       this.router.navigate(['/comprovante/cadastrar']);
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }

  showAddItem() {
    document.querySelector('.checklist-input-box').classList.toggle('input-box-reveal');
  }

  editItem() {
    this.isEditando = !this.isEditando;
  }

  addItem() {
    const inputBox = document.querySelector('.add-item-input') as HTMLInputElement;
    this.itens.push([`${inputBox.value}`, 0]);
    this.cleanInput();
    this.showAddItem();
  }

  cleanInput() {
    const inputBox = document.querySelector('.add-item-input') as HTMLInputElement;
    inputBox.value = '';
  }


  deleteItem(item: any) {
    delete this.itens[this.itens.indexOf(item)]
    this.itens = this.itens.filter(i => i[0] !== this.itens.indexOf(item))
  }

  fillNumbers() {
    for (let i = 1; i <= 20; i++) {
      let formattedNumber = i < 10 ? '0' + i : i;
      this.numbers.push(formattedNumber);
    }
  }


  enableEdit(item: any): void {
    const allInputs = document.querySelectorAll('.default-item-input');
    const index = this.itens.indexOf(item);

    allInputs.forEach(element => {
      if (allInputs[index] !== element) {
        element.classList.add('click-disabled');
        element.classList.remove('focus-editing-input');
      }
    });

    allInputs[index].classList.toggle('click-disabled');
    allInputs[index].classList.toggle('focus-editing-input');
  }

}

export interface ChecklistItem {
  sentence: string;
  note: string;
  loteId: number;
}