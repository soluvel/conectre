import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-propriedade-cadastro',
  templateUrl: './propriedade-cadastro.component.html',
  styleUrls: ['./propriedade-cadastro.component.scss']
})
export class PropriedadeCadastroComponent implements OnInit, OnDestroy {
form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      // infos do form conform card do notion
    });
  }

  ngOnDestroy() {
    // this.destroy$.next();
    // this.destroy$.complete();
  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.produtorId = params.get('id');
    //   this.getProdutor();
    // });
    //
    // this.empresaService.getEmpresasReduce().subscribe(data => {
    //   this.empresas = data;
    // });
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
  // onSubmit() {
  //   this.service.save(this.form.getRawValue()).pipe(takeUntil(this.destroy$)
  //   ).subscribe({
  //     next: response => {
  //       this.toastr.success('Formulário salvo com sucesso!');
  //       this.router.navigate(['/inicio']);
  //     },
  //     error: error => {
  //       console.error('Erro:', error);
  //     }
  //   });
  //
  // }
  //
  // handleImageUpload($event: Event) {
  //
  // }
}
