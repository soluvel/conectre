import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-equipamento',
  templateUrl: './equipamento.component.html',
  styleUrls: ['./equipamento.component.scss']
})
export class EquipamentoComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    // if (this.form.valid) {
    //   // Aqui você pode enviar os dados do formulário para um serviço ou processar conforme necessário
    //   console.log(this.form.value);
    //   this.dialogRef.close(this.form.value);  // Feche o dialog e envie os dados de volta
    // }
  }

  closeModal() {
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
  }
}
