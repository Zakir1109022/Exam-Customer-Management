import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';



@NgModule({
    declarations:[DialogComponent],
    imports:[
        MatButtonModule,
        MatDialogModule
    ],
    exports:[DialogComponent]
})

export class DialogModule{}