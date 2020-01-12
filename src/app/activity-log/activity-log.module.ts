import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLogListComponent } from './activity-log-list/activity-log-list.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { DynamicTableModule } from '../shared/dynamic-table/dynamic-table.module';


const routes: Routes = [
  {path:'',component:ActivityLogListComponent}
];


@NgModule({
  declarations: [ActivityLogListComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
    DynamicTableModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivityLogModule { }
