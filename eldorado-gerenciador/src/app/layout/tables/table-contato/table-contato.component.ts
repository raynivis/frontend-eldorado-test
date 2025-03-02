import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TooltipComponent } from '../../../tools/tooltip/tooltip.component';
import { ModalConfirmComponent } from '../../modals/modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-table-contato',
  imports: [TooltipComponent, ModalConfirmComponent],
  templateUrl: './table-contato.component.html',
  styleUrl: './table-contato.component.css'
})
export class TableContatoComponent {
  @Input() tipo = '';
  textoConfirmar = '';
  @ViewChild('ModalConf') modalElementConfirmar !: ElementRef;

  //Abrir o Modal de Confirmar Acao
  openModalConfirmar(){
    if (this.modalElementConfirmar) {
      const modal = new (window as any).bootstrap.Modal(this.modalElementConfirmar.nativeElement);
      modal.show();
    } else {
      console.error('Modal element não encontrado');
    }
  }

  //Desativar
  ConfDesativar() {
    this.textoConfirmar = "Você deseja mesmo desativar este contato?";
    this.openModalConfirmar();
  }

  //Ativar
  ConfAtivar() {
    this.textoConfirmar = "Você deseja mesmo ativar este contato?";
    this.openModalConfirmar();
  }



}
