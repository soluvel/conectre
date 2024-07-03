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
  private destroy$ = new Subject<void>();
  msgButton: string;
  form: FormGroup;
  produtores: any;

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
    this.produtorService.getProdutorReduce().subscribe(data => {
      this.produtores = data;
    });

    this.route.paramMap.subscribe(params => {
    });

    this.msgButton = this.form.valid ? "Cadastrar Propriedade" : "Salvar Alterações"
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
