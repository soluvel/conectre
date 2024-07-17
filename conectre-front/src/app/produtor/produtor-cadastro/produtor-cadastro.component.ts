import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmpresaService } from "../../empresa/empresa.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { ProdutorService } from "../produtor.service";
import { StringNumberFormats } from "../../utils/StringNumberFormats";
import { StorageService } from "../../storage.service";

@Component({
  selector: 'app-produtor-cadastro',
  templateUrl: './produtor-cadastro.component.html',
  styleUrls: ['./produtor-cadastro.component.scss']
})
export class ProdutorCadastroComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isEditando: boolean = false;
  produtorId: any;
  private destroy$ = new Subject<void>();
  empresas: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private service: ProdutorService,
              private empresaService: EmpresaService,
              private router: Router,
              public storage: StorageService) {
    this.form = this.formBuilder.group({
      id: [],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      celular: ['', Validators.required],
      empresa: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.produtorId = params.get('id');
      this.getProdutor();
    });

    this.empresaService.getEmpresasReduce().subscribe(data => {
      this.empresas = data;
    });
  }

  getProdutor(): void {
    this.service.findOne(parseInt(this.produtorId)).subscribe(data => {
      this.form.patchValue(data);
      this.form.get('celular').setValue(StringNumberFormats.formatCelular(this.form.get('celular').value));
      this.form.get('cpf').setValue(StringNumberFormats.formatCpfCnpj(this.form.get('cpf').value));
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

  handleImageUpload($event: Event) {

  }
}
