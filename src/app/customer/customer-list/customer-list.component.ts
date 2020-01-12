import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../service/customer.service';
import { ActivityLogService } from '../../activity-log/service/activity-log.service';
import { CustomerActivityLog } from '../../activity-log/model/customer-activity-log.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'gender'];
  dataList: Customer[] = [];
  loader:boolean=true;
  subscription: Subscription[] = [];


  constructor(
    private router: Router,
    private customerService: CustomerService,
    private activityLogService: ActivityLogService
  ) { }

  ngOnInit() {
    this.customerList();
  }


  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    })
  }

  customerList(){
    this.loader=true;
    this.subscription.push(
      this.customerService.getCustomerList().subscribe(res => {
        if (res.success) {
          this.dataList = res.data;
        }
        else {
          this.dataList = [];
        }
        this.loader=false;
      })
    )
  }

  onClickAddCustomer() {
    this.router.navigate(['./customer-list/add']);
  }

  onEdit(e) {
    this.router.navigate(['./customer-list/edit/'+e.id]);
  }

  onDelete(e) {
    this.subscription.push(
      this.customerService.deleteCustomer(e.sendData.id).subscribe(res=>{
        if(res.success)
        {
          this.dataList=res.data;

           //add activity log
           let activityLog=new CustomerActivityLog();
           activityLog.name=e.sendData.name;
           activityLog.action_type='Delete Customer';
           activityLog.log_date=new Date();
 
           this.activityLogService.addLog(activityLog).subscribe(res=>{
             if (res['success']) {
              this.activityLogService.onChangeLog({isLogAdd:true})
             }
           })
        }
      })
    )

  }

}
