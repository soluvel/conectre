import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PropriedadeService } from "../propriedade.service";
import { Subject, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { ViaCepService } from "../../via-cep.service";
import { ProdutorService } from "../produtor.service";
import { ExcelService } from "../../excel.service";

@Component({
  selector: 'app-propriedade-cadastro',
  templateUrl: './propriedade-cadastro.component.html',
  styleUrls: ['./propriedade-cadastro.component.scss']
})
export class PropriedadeCadastroComponent implements OnInit, OnDestroy {

  isEditando: boolean = false;
  propriedadeId: any;
  private destroy$ = new Subject<void>();
  msgButton: string;
  form: FormGroup;
  produtores: any[] = [];
  exibirTanque: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private service: PropriedadeService,
              private produtorService: ProdutorService,
              private excelService: ExcelService,
              private toastr: ToastrService,
              private viaCepService: ViaCepService,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      produtor: ['', Validators.required],
      produtorNome: [''],
      endereco: this.formBuilder.group({
        cep: [''],
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        localidade: [''],
        uf: [''],
      }),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.propriedadeId = params.get('id');
      this.getPropriedade();
    });

    this.produtorService.getProdutorReduce().subscribe(data => {
      this.produtores = data;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getPropriedade(): void {
    this.service.getPropriedade(parseInt(this.propriedadeId)).subscribe(data => {
      this.form.patchValue(data);
      this.form.get('produtor').setValue(data.produtor.id);
      this.isEditando = true;
      this.msgButton = !this.isEditando ? "Cadastrar Propriedade" : "Salvar Alterações"
    });
  }

  onSubmit() {
    this.service.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.toastr.success('Formulário salvo com sucesso!');
        this.router.navigate(['/inicio']);
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }

  newTanque() {
    let nome = this.produtores.filter(p => p.id == this.form.get('produtor').value).map(p => p.nome)[0];
    let dados = this.form.getRawValue();
    dados.produtorNome = nome;
    localStorage.setItem('propriedade', JSON.stringify(dados));
    this.router.navigate(['/tanque/cadastrar']);
  }


  getEnderecoViaCep() {
    this.viaCepService.getEndereco(this.form.get('endereco.cep').value).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.form.get('endereco').patchValue(response);
      },
      error: error => {
        console.error('Erro:', error);
      }
    });
  }

  selectOpen() {
    document.querySelector('.select-title').classList.toggle('select-title-open');
    document.querySelector('.menu-arrow-icon-select').classList.toggle('menu-arrow-icon-select-open');

    document.querySelector('.select-infos').classList.toggle('select-infos-open');
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

  onDownload(): void {
    this.excelService.downloadExcel().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download failed', error);
    });
  }

}
