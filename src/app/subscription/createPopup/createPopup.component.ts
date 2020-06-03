import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createPopup',
  templateUrl: './createPopup.component.html',
  styleUrls: ['./createPopup.component.css']
})
export class CreatePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreatePopupComponent>
  ) { }

  ngOnInit() {
  }

  onNewSub(form: NgForm) {
    this.dialogRef.close(form.form.value);
  }

}
