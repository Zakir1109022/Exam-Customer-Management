import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'customer-list'},
  {path:'customer-list',loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule)},
  {path:'activity-log-list',loadChildren:()=>import('./activity-log/activity-log.module').then(m=>m.ActivityLogModule)},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',redirectTo:'not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations:[NotFoundComponent]
})
export class AppRoutingModule { }
