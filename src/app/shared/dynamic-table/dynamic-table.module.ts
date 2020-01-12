import { NgModule } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogModule } from '../dialog/dialog.module';
import { DynamicTableComponent } from './dynamic-table.component';





@NgModule({
    declarations: [
        DynamicTableComponent
    ],
    imports: [
        CommonModule,
        NgxPaginationModule,
        DialogModule
    ],
    exports: [DynamicTableComponent],
    entryComponents:[DialogComponent],
    providers: []
})

export class DynamicTableModule { }