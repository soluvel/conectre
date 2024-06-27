import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PropriedadeService } from "../propriedade.service";
import { Subject, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { ViaCepService } from "../../via-cep.service";

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

  constructor(private formBuilder: FormBuilder,
    private service: PropriedadeService,
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
    this.route.paramMap.subscribe(params => {

      // Acredito que aqui seria para pegar o ID do produtor 

      // this.ProdutorId = params.get('id');
      // this.getProdutor();
    });

    this.msgButton = this.form.valid ? "Cadastrar Propriedade" : "Salvar Alterações"
  }

  activeMessage: string = 'Peixe';
  activeComponent: string;

  onTabChange(tabLabel: string) {
    this.changeMessage(tabLabel);
    this.activeComponent = tabLabel
  }

  changeMessage(tabLabel: string) {
    const messages = {
      Peixe: 'Peixe',
      Ambiente: 'Ambiente',
      Racao: 'Ração',
      default: 'Peixe'
    };

    this.activeMessage = messages[tabLabel] || messages.default;
  }

  getActiveComponent(): string {
    return this.activeComponent;
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
  //
  // getProdutor(): void {
  //   this.service.findOne(parseInt(this.produtorId)).subscribe(data => {
  //     this.form.patchValue(data);
  //     this.form.get('celular').setValue(StringNumberFormats.formatCelular(this.form.get('celular').value))
  //     this.form.get('cpf').setValue(StringNumberFormats.formatCpfCnpj(this.form.get('cpf').value))
  //     this.isEditando = true;
  //   });
  // }
  //

  // handleImageUpload($event: Event) {
  //
  // }

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
}
