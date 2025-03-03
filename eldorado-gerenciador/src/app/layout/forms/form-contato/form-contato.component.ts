import { Component, ElementRef, inject, Input, input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContatoService } from '../../../services/contato.service';
import { ToastComponent } from '../../../tools/toast/toast.component';
import { TipoContatoService } from '../../../services/tipo-contato.service';
import { TipoContato } from '../../../models/tipo-usuario-model';

@Component({
  selector: 'app-form-contato',
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: './form-contato.component.html',
  styleUrl: './form-contato.component.css'
})
export class FormContatoComponent implements OnInit {
  //usar o usuario da lista de usuarios 
  @Input() idUsuario: undefined | number;
  @ViewChild('Toast') toastElement!: ElementRef;
  isLoading = false; //controlar o carregamento
  feedbackToast = ''; //texto para o toast
  tipoFeedback = ''; //tipo positivo/negativo
  private readonly fB = inject(FormBuilder);
  private readonly contactService = inject(ContatoService);
  //para listar o tipo de contato
  private typeService = inject(TipoContatoService);
  tipos: TipoContato[] = [];
  
  form = this.fB.group({
    idtipo: ["selecione"],
    nome: ['', Validators.required],
    valor: ['', Validators.required],
  });

  ngOnInit(): void {
    this.typeService.listAtivos().subscribe((data) => { //faz sentindo ser so os ativos
      this.tipos = data;
    });
  }

  cadastrar() {
    if(this.form.value.idtipo == "selecione"){
      this.feedbackToast = 'Selecione um tipo de contato!';
      this.tipoFeedback = 'bg-danger';
      this.openModalToastS();
      return;
    }

    const contact = {
      idtipo: Number(this.form.value.idtipo),
      idusuario: this.idUsuario,
      nome: this.form.value.nome,
      valor: this.form.value.valor,
    }; //objt a ser enviado para API
  
    this.isLoading = true; // Desativa o botão para evitar spam
  
    console.log(contact);
    this.contactService.createContact(contact).subscribe({
      next: () => { //apos a requisicao
        this.isLoading = false;
        this.form.reset();
        this.form.patchValue({ idtipo: 'selecione' });
        this.feedbackToast = 'Contato Cadastrado com Sucesso';
        this.tipoFeedback = 'bg-success';
        this.openModalToastS();
      },
      error: (err) => { //caso de erro
        this.isLoading = false;
        console.error("Erro ao cadastrar:", err);
        //erro comum do usuario
        if (err.status === 401) {
          this.feedbackToast = 'Não autorizado! Faça novamente seu login.';
        } else {
          this.feedbackToast = `Ocorreu um erro: ${err.message || 'Erro desconhecido'}`;
        }
        this.tipoFeedback = 'bg-danger';
        this.openModalToastS();
      }
    });
  }

  openModalToastS() {
    if (this.toastElement) {
      const modal = new (window as any).bootstrap.Toast(this.toastElement.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }


}
