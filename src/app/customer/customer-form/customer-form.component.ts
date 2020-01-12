import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../service/customer.service';
import { Location } from '@angular/common';
import { ActivityLogService } from '../../activity-log/service/activity-log.service';
import { CustomerActivityLog } from '../../activity-log/model/customer-activity-log.model';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit, OnDestroy {


  customerForm: FormGroup;
  subcription: Subscription[] = [];
  customerId: number;
  btn_text: string = 'Save'
  loader: boolean = false;
  phone_Id: number = 0;
  email_Id: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private activityLogService: ActivityLogService,
    private toastrService: ToastrService,
    private location: Location

  ) {
    this.customerId = this.route.snapshot.params.id;

    this.customerForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      gender: ["male", Validators.required],
      phone: this.formBuilder.array([this.createPhone()]),
      email: this.formBuilder.array([this.createEmail()])
    })
  }

  ngOnInit() {
    this.initForm();
  }


  initForm(): void {
    if (this.customerId != undefined) {
      this.btn_text = 'Update'
      this.customerService.getCustomerById(this.customerId).subscribe(res => {
        if (res['success']) {

          let phoneControl = <FormArray>this.customerForm.get('phone');
          for (let i = 1; i <= res['data'].phone.length - 1; i++) {
            phoneControl.push(this.createPhone());
          }

          let emailControl = <FormArray>this.customerForm.get('email');
          for (let i = 1; i <= res['data'].email.length - 1; i++) {
            emailControl.push(this.createEmail());
          }

          this.customerForm.patchValue(res['data']);
        }
      })
    }
  }


  createPhone() {
    this.phone_Id++;
    return this.formBuilder.group({
      id: [this.phone_Id],
      type: ["", Validators.required],
      phone_number: ["", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    });
  }



  onClickAddPhone(): void {
    let phoneControl = <FormArray>this.customerForm.get('phone');
    phoneControl.push(this.createPhone());
  }

  onClickRemovePhone(index): void {
    let phoneControl = <FormArray>this.customerForm.get('phone');
    phoneControl.removeAt(index);
  }



  createEmail() {
    this.email_Id++;
    return this.formBuilder.group({
      id: [this.email_Id],
      type: ["", Validators.required],
      email_value: ["", [Validators.required, Validators.email]],
    });
  }



  onClickAddEmail(): void {
    let emailControl = <FormArray>this.customerForm.get('email');
    emailControl.push(this.createEmail());
  }

  onClickRemoveEmail(index): void {
    let emailControl = <FormArray>this.customerForm.get('email');
    emailControl.removeAt(index);
  }



  onClickBack(): void {
    this.location.back();
  }

  onClickCancel(): void {
    this.customerForm.reset();
  }


  save(): void {
    this.loader = true;
    if (this.customerId) {
      const customer = this.customerForm.value;
      this.subcription.push(this.customerService.updateCustomer(customer).subscribe(res => {
        if (res['success']) {
          console.log(res)

          //add activity log
          let activityLog = new CustomerActivityLog();
          activityLog.name = customer.name;
          activityLog.action_type = 'Update Customer';
          activityLog.log_date = new Date();

          this.activityLogService.addLog(activityLog).subscribe(res => {
            if (res['success']) {

              setTimeout(t => {
                this.loader = false;
                this.toastrService.success('Update successful', 'Update', {
                  timeOut: 3000
                });

                this.activityLogService.onChangeLog({ isLogAdd: true })
                this.router.navigate(['./customer-list'])
              }, 2000)

            }
          })



        }
      }, error => {
        this.loader = false;
        this.toastrService.error(error, 'Error', { timeOut: 3000 })
      }));

    }
    else {
      console.log(this.customerForm.value)
      let customer_id;
      this.customerService.getAutoCustomerId().subscribe(
        res => {
          customer_id = res['id'];
        }
      );
      this.customerForm.get('id').setValue(customer_id);

      const customer = this.customerForm.value;
      this.subcription.push(this.customerService.addCustomer(customer).subscribe(res => {
        if (res['success']) {

          //add activity log
          let activityLog = new CustomerActivityLog();
          activityLog.name = customer.name;
          activityLog.action_type = 'Add Customer';
          activityLog.log_date = new Date();

          this.activityLogService.addLog(activityLog).subscribe(res => {
            if (res['success']) {



              setTimeout(t => {
                this.loader = false;
                this.toastrService.success('Save successful', 'Save', {
                  timeOut: 3000
                });

                this.activityLogService.onChangeLog({ isLogAdd: true })
                this.router.navigate(['./customer-list'])
              }, 2000)
            }
          })



        }
      }, error => {
        this.loader = false;
        this.toastrService.error(error, 'Error', { timeOut: 3000 })
      }))
    }

  }





  ngOnDestroy() {
    this.subcription.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
