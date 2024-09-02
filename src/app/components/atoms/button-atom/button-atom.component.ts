import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-atom',
  templateUrl: './button-atom.component.html',
  styleUrls: ['./button-atom.component.sass']
})
export class ButtonAtomComponent {
  @Input() children?: string;
  @Input() variant?: string;
  @Input() tooltipText?: string;
  @Output() onClicAction?: string;
}
