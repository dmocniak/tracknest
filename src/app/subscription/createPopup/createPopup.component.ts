import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-createPopup',
  templateUrl: './createPopup.component.html',
  styleUrls: ['./createPopup.component.css']
})
export class CreatePopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
