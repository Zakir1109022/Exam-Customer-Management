import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CustomerActivityLog } from '../model/customer-activity-log.model';
import { ActivityLogService } from '../service/activity-log.service';
import { groupBy } from 'rxjs/internal/operators/groupBy';

@Component({
  selector: 'app-activity-log-list',
  templateUrl: './activity-log-list.component.html',
  styleUrls: ['./activity-log-list.component.css']
})
export class ActivityLogListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'action_type', 'log_date'];
  dataList: CustomerActivityLog[] = [];
  loader: boolean = true;
  subscription: Subscription[] = [];


  constructor(
    private router: Router,
    private activityLogService: ActivityLogService
  ) { }

  ngOnInit() {
    this.logList();
  }


  ngOnDestroy() {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    })
  }

  logList() {
    this.loader = true;
    this.subscription.push(
      this.activityLogService.getLogList().subscribe(res => {
        if (res.success) {
          this.dataList = res.data;
        }
        else {
          this.dataList = [];
        }
        this.loader = false;
      })
    )
  }


}
