import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subject, takeUntil } from "rxjs";
import { ExcelService } from "../../excel.service";
import { ProdutorService } from "../../produtor/produtor.service";
import { PropriedadeService } from "../../produtor/propriedade.service";
import { ViaCepService } from "../../via-cep.service";
import { LoteService } from '../lote.service';

@Component({
  selector: 'app-lote-detalhes',
  templateUrl: './lote-detalhes.component.html',
  styleUrls: ['./lote-detalhes.component.scss']
})
export class LoteDetalhesComponent implements OnInit, OnDestroy {

  isEditando: boolean = false;
  propriedadeId: any;
  private destroy$ = new Subject<void>();
  msgButton: string;
  form: FormGroup;
  produtores: any[] = [];
  exibirTanque: boolean = false;
  loteDetail: any;
  dataFinalizar: any;
  horaFinalizar: any;

  constructor(private formBuilder: FormBuilder,
    private service: PropriedadeService,
    private produtorService: ProdutorService,
    private excelService: ExcelService,
    private toastr: ToastrService,
    private viaCepService: ViaCepService,
    private loteService: LoteService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this.formBuilder.group({
      id: [''],
      nomeTanque: [''],
      lote: [''],
      ciclo: [''],
      tipoTanque: [''],
      area: [''],
      potenciaAeracaoTotal: [''],
      especie: [''],
      origem: [''],
      dataAlojamento: [''],
      qtdRecebida: [''],
      mortalidade: [''],
      qtdRecebida2: [''],
      pesoMedio: [''],
      biomassaTotal: [''],
      densidade: [''],
      biomassaCVAtual: [''],
      pesoAbateEsperado: [''],
      biomassaEstimadaFinal: [''],
      data: [''],
      saida: [''],
      entrada: [''],
      temperaturaAgua: [''],
      oxigenio: [''],
      placaVeiculo: [''],
      numeroCaixas: [''],
      peixePorCaixa: [''],
      pesoMedioComprovante: [''],
      pesoTotal: [''],
      numeroLacre: [''],
    });
}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    this.propriedadeId = params.get('id');
    this.getPropriedade();
    this.getLoteDetail();
    this.getLoteInfos();

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

getLoteDetail(): void {
  this.loteService.findDetail(parseInt(this.propriedadeId)).subscribe(data => {
    this.loteDetail = data;
  });
}

getLoteInfos(): void {
  this.loteService.findInfos(parseInt(this.propriedadeId)).subscribe(data => {
    this.form.patchValue(data);
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

popUpFinalizar() {
  this.openPopup();
   
    // let nome = this.produtores.filter(p => p.id == this.form.get('produtor').value).map(p => p.nome)[0];
    // let dados = this.form.getRawValue();
    // dados.produtorNome = nome;
    // localStorage.setItem('propriedade', JSON.stringify(dados));
    // this.router.navigate(['/tanque/cadastrar']);
}

  finalizarLote(dataFinalizar, horaFinalizar ) {
    const loteFinalizacao = {
      loteId: parseInt(this.propriedadeId),
      dtFinalizacao: dataFinalizar,
      hrFinalizacao: horaFinalizar
    };
    
    this.loteService.patch(loteFinalizacao).pipe(takeUntil(this.destroy$)
    ).subscribe({
      next: response => {
        this.toastr.success('Lote finalizado com sucesso!');
        this.closePopup();
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

openPopup() {
  var overlay = document.getElementById('overlayEndLote');
  overlay.style.display = 'block';

  var popupWall = document.getElementById('popupWall');
  popupWall.style.display = 'block';
}

closePopup() {
  var overlay = document.getElementById('overlayEndLote');
  overlay.style.display = 'none';

  var popupWall = document.getElementById('popupWall');
  popupWall.style.display = 'none';
}

}
