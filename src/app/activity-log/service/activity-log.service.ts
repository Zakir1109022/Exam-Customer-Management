import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { CustomerActivityLog } from '../model/customer-activity-log.model';



@Injectable({
    providedIn: 'root'
})

export class ActivityLogService {

    LogSubject = new BehaviorSubject(null);

    constructor() { }


    onChangeLog(data) {
        this.LogSubject.next(data);
    }

    getAutoLogId() {
        let list = [];
        let storagelist = JSON.parse(localStorage.getItem('CustomerLogList'));
        list = storagelist != undefined ? storagelist : [];

        let Id = list.length == 0 ? 1 : Math.max.apply(Math, list.map(x => { return x.id })) + 1;
        return Id
    }


    getLogList(): Observable<any> {
        return new Observable<any>((observer: Observer<any>) => {
            let list = [];
            let storageList = JSON.parse(localStorage.getItem('CustomerLogList'));
            list = storageList != undefined ? storageList : [];
            observer.next({ success: true, data: list })
        })
    }

    addLog(formData: CustomerActivityLog): Observable<any> {
        return new Observable((observer) => {
            let list = [];
            let storagelist = JSON.parse(localStorage.getItem('CustomerLogList'));
            list = storagelist != undefined ? storagelist : [];

            formData.id = this.getAutoLogId();
            list.push(formData);

            localStorage.setItem('CustomerLogList', JSON.stringify(list));

            observer.next({ success: true })
        });
    }

}
