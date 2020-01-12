import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Customer } from '../model/customer.model';



// @Injectable({
//     providedIn: 'root'
// })

export class CustomerService {

    constructor() { }


    getAutoCustomerId(): Observable<any> {
        let list = [];
        let storagelist = JSON.parse(localStorage.getItem('CustomerList'));
        list = storagelist != undefined ? storagelist : [];

        let Id = list.length == 0 ? 1 : Math.max.apply(Math, list.map(x => { return x.id })) + 1;

        return new Observable((observer) => {
            observer.next({ id: Id });
        });

    }

    getCustomerById(id): Observable<any> {
        return new Observable<any>((observer: Observer<any>) => {
            let list = [];
            list = JSON.parse(localStorage.getItem('CustomerList'));
            const obj = list.find(x => x.id == id);

            observer.next({ success: true, data: obj })
        })
    }

    addCustomer(formData: Customer): Observable<any> {
        return new Observable((observer) => {
            let list = [];
            let storagelist = JSON.parse(localStorage.getItem('CustomerList'));
            list = storagelist != undefined ? storagelist : [];
            list.push(formData);

            localStorage.setItem('CustomerList', JSON.stringify(list));
            
            observer.next({ success: true })
        });
    }


    updateCustomer(formData: Customer): Observable<any> {
        return new Observable((observer) => {
            let list = [];
            list = JSON.parse(localStorage.getItem('CustomerList'));
            list.map((obj: Customer) => {
                if (obj.id == formData.id) {
                    obj.name = formData.name;
                    obj.email = formData.email;
                    obj.phone = formData.phone;
                    obj.gender = formData.gender;
                }
            })

            localStorage.setItem('CustomerList', JSON.stringify(list));
            observer.next({ success: true })
        });
    }


    getCustomerList(): Observable<any> {
        return new Observable<any>((observer: Observer<any>) => {
            let list = [];
            let storageList = JSON.parse(localStorage.getItem('CustomerList'));
            list = storageList != undefined ? storageList : [];
            observer.next({ success: true, data: list })
        })
    }

  



    deleteCustomer(id: number): Observable<any> {
        return new Observable((observer) => {
            let list = [];
            list = JSON.parse(localStorage.getItem('CustomerList'));

            let newList = list.filter(x => x.id != id);
            localStorage.setItem('CustomerList', JSON.stringify(newList));

            observer.next({ success: true, data: newList })
        });
    }





}
