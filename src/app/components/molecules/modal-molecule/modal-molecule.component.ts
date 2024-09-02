import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-molecule',
  templateUrl: './modal-molecule.component.html',
  styleUrls: ['./modal-molecule.component.sass'],
})
export class ModalMoleculeComponent {
  subscriptionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalMoleculeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.subscriptionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(this.data.minAmount)]],
    });
  }

  onConfirm(): void {
    if (this.subscriptionForm.valid) {
      this.dialogRef.close(this.subscriptionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
