import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit() {
  }


  onClickYes()
  {
    this.dialogRef.close({result:true});
  }

  onClickNo(){
    this.dialogRef.close({result:false});
  }

}
