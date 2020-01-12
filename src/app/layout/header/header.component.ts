import { Component, OnInit } from '@angular/core';
import { ActivityLogService } from '../../activity-log/service/activity-log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logCount:number=0;
  constructor(
    private router:Router,
    private activityLogService: ActivityLogService
  ) { }

  ngOnInit() {

    this.activityLogService.LogSubject.subscribe(res=>{
      if(res !=null){
        this.logCount=res.isLogAdd ? (this.logCount+1) :this.logCount;
      }
    })
  }


  onClickCount(){
    this.logCount=0;
    this.router.navigate(['./activity-log-list']);
  }

}
