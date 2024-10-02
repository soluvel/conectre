import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit, OnDestroy  {

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

  constructor(private formBuilder: FormBuilder,
              // private service: PropriedadeService,
              // private produtorService: ProdutorService,
              // private excelService: ExcelService,
              // private viaCepService: ViaCepService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      // id: [],      
      // tanque: ['', Validators.required],
      // lote: ['', Validators.required],
      // ciclo: ['', Validators.required],
      // tipoTanque: ['', Validators.required],
      // area: ['', Validators.required],
      // aeracaoTotal: ['', Validators.required],
      // especie: ['', Validators.required],
      // origem: ['', Validators.required],
      // dataAlojamento: ['', Validators.required],
      // primeiraRemessa: ['', Validators.required],
      // mortalidadeAlojamento: ['', Validators.required],
      // segundaRemessa: ['', Validators.required],
      // pesoMedio: ['', Validators.required],
      // biomassaAlojada: ['', Validators.required],
      // densidade: ['', Validators.required],
      // biomassaCVAtual: ['', Validators.required],
      // PesoAbateEsperado: ['', Validators.required],
      // biomassaEstimada: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.fillNumbers();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPropriedade(): void {
    
  }

  onSubmit() {
    
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

  fillNumbers () {
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
