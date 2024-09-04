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

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

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
      avatar: [''],
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

  getProdutor(): void {
    this.service.findOne(parseInt(this.produtorId)).subscribe(data => {
      this.form.patchValue(data);
      this.form.get('celular').setValue(StringNumberFormats.formatCelular(this.form.get('celular').value));
      this.form.get('cpf').setValue(StringNumberFormats.formatCpfCnpj(this.form.get('cpf').value));

      if (data.avatar != null) {
        this.imagePreview = `data:image/png;base64,${data.avatar}`;
      }

      this.isEditando = true;
    });
  }

  onSubmit() {
    if (this.form.get('id').value != null) {
      this.updating();
    } else {
      this.saving();
    }

  }

  updating() {
    this.service.edit(this.form.get('id').value, this.form.getRawValue()).pipe(takeUntil(this.destroy$)
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

  saving() {
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

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;

        const base64String = reader.result?.toString().split(',')[1];
        this.form.patchValue({avatar: base64String});
        this.form.get('avatar')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }
}
