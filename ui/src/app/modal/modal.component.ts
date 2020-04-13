﻿import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'jw-modal',
  template:
    `<div class="jw-modal">
        <div class="jw-modal-body">
            <ng-content></ng-content>
        </div>
      </div>`
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;
  private base: string;
  private visible: string;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    let modal = this;
    this.base = "jw-modal";
    this.visible="-invisble";

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === this.base+this.visible) {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
    this.close();
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.className = this.base+"-visible";
    this.visible="-visible"
  }

  // close modal
  close(): void {
    this.element.className= this.base+"-invisible";
    this.visible="-invisible"
  }
}