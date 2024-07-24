import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmpresaService } from "../../empresa.service";
import { Subject, takeUntil } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { ViaCepService } from "../../../via-cep.service";
import { StringNumberFormats } from "../../../utils/StringNumberFormats";

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isEditando: boolean = false;
  empresaId: any;
  private destroy$ = new Subject<void>();
  msgButton: string;
  buttonPopUpAction = 'por escolher'; //vou puxar esse nome para ativar a função noo popUp

  constructor(private formBuilder: FormBuilder,
              private service: EmpresaService,
              private toastr: ToastrService,
              private viaCepService: ViaCepService,
              private route: ActivatedRoute,
              private router: Router) {
    this.form = this.formBuilder.group({
      id: [],
      razaoSocial: ['', Validators.required],
      cnpjCpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [''],
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        localidade: [''],
        uf: [''],
      }),
      plano: [''],
      grupo: this.formBuilder.group({
        id: ['']
      }),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.empresaId = params.get('id');
      if (this.empresaId != null) {
        this.isEditando = true;
      }
      this.getEmpresa();
    });

    this.msgButton = !this.isEditando ? "Cadastrar Empresa" : "Salvar Alterações"
  }

  getEmpresa(): void {
    this.service.getEmpresa(parseInt(this.empresaId)).subscribe(data => {
      this.form.patchValue(data);
      this.form.get('cnpjCpf').setValue(StringNumberFormats.formatCpfCnpj(this.form.get('cnpjCpf').value));
    });
  }

  openGrupoForm() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
  }

  onSubmit() {
    let textoLimpo = this.form.get('cnpjCpf').value.replace(/[^\w]/g, '');
    this.form.get('cnpjCpf').setValue(textoLimpo);

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

  openConfirm() {
    var overlay = document.getElementById('overlayConfirm');
    overlay.style.display = 'block';

    var filterWall = document.getElementById('filterWall');
    filterWall.style.display = 'block';

    document.querySelector('.overlay-text').innerHTML = 'Você deseja salvar a sua alteração do perfil da empresa (Colocar nome da empresa)';
    document.querySelector('.confirm-button').innerHTML = 'Salvar';
    document.querySelector('.confirm-button').setAttribute("style", "background:#068FFF;");
    document.querySelector('.cancel-button').innerHTML = 'Descartar alteração';
  }

}
