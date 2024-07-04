import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmpresaService } from "../../empresa/empresa.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { TecnicoService } from "../tecnico.service";
import { ViaCepService } from "../../via-cep.service";
import { StringNumberFormats } from "../../utils/StringNumberFormats";

@Component({
  selector: 'app-tecnico-cadastro',
  templateUrl: './tecnico-cadastro.component.html',
  styleUrls: ['./tecnico-cadastro.component.scss']
})
export class TecnicoCadastroComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isEditando: boolean = false;
  tecnicoId: any;
  private destroy$ = new Subject<void>();
  empresas: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private service: TecnicoService,
              private empresaService: EmpresaService,
              private viaCepService: ViaCepService,
              private router: Router) {
    this.form = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      cpf: ['', Validators.required],
      empresa: ['', Validators.required],
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.tecnicoId = params.get('id');
      this.getTecnico();
    });

    this.empresaService.getEmpresasReduce().subscribe(data => {
      this.empresas = data;
    });
  }

  getTecnico(): void {
    this.service.getTecnico(parseInt(this.tecnicoId)).subscribe(data => {
      this.form.patchValue(data);
      this.form.get('celular').setValue(StringNumberFormats.formatCelular(this.form.get('celular').value))
      this.form.get('cpf').setValue(StringNumberFormats.formatCpfCnpj(this.form.get('cpf').value))
      this.isEditando = true;
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

  handleImageUpload($event: Event) {

  }
}
