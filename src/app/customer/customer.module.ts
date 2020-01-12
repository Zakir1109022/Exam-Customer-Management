import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { Routes, RouterModule } from '@angular/router';
import { DynamicTableModule } from '../shared/dynamic-table/dynamic-table.module';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from './service/customer.service';

const routes: Routes = [
  {path:'',component:CustomerListComponent},
  {path:'add',component:CustomerFormComponent},
  {path:'edit/:id',component:CustomerFormComponent}
];

@NgModule({
  declarations: [CustomerListComponent, CustomerFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DynamicTableModule,
    CustomMaterialModule,
    ReactiveFormsModule
  ],
  providers:[CustomerService]
})
export class CustomerModule { }
