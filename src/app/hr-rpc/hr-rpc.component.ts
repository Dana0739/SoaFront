import {Component, Input, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {AppWorker} from '../worker';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {OrganizationService} from '../organization.service';

@Component({
  selector: 'app-hr-rpc',
  templateUrl: './hr-rpc.component.html',
  styleUrls: ['./hr-rpc.component.css']
})
export class HrRpcComponent implements OnInit {

  positions = [
    {value: 'laborer', viewValue: 'Laborer'},
    {value: 'human_resources', viewValue: 'Human Resources'},
    {value: 'cleaner', viewValue: 'Cleaner'},
    {value: 'manager_of_cleaning', viewValue: 'Cleaning Manager'}
  ];

  statuses = [
    {value: 'hired', viewValue: 'Hired'},
    {value: 'recommended_for_promotion', viewValue: 'Recommended for promotion'},
    {value: 'regular', viewValue: 'Regular'},
    {value: 'probation', viewValue: 'Probation'},
    {value: null, viewValue: ''}
  ];

  @ViewChild('formTemplate')
  formTemplate: TemplateRef<any>;

  @Input()
  workerId: number;

  idValid: boolean;
  formGroup: FormGroup;
  formValid: boolean;
  openedDialog: MatDialogRef<any>;

  constructor(private formBuilder: FormBuilder,
              private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.formValid = false;
    this.idValid = false;
    this.formGroup = this.formBuilder.group({
      personId: [],
      orgId: [],
      startDate: [],
      position: [],
      status: []
    });
  }

  fire(): void {
    console.log(this.formGroup.value);
    if (this.workerId > 0) {
      this.idValid = true;
      this.organizationService.fire(this.workerId);
    } else {
      this.idValid = false;
    }
  }

  hire(): void {
    const data = (this.formGroup.value as HireFormData);
    if (this.checkForm(data)) {
      this.formValid = true;
      this.organizationService.hire(data);
    } else {
      console.log('form not valid');
      this.formValid = false;
    }
  }

  private checkForm(data: HireFormData): boolean {
    return data.orgId > 0 && data.personId > 0
      && data.startDate !== undefined && data.startDate !== null && data.startDate !== ''
      && data.position !== undefined && data.position !== null && data.position !== ''
      && data.status !== undefined && data.status !== null && data.status !== '';
  }
}

export class HireFormData {
  personId: number;
  orgId: number;
  startDate: string;
  position: string;
  status: string;
}
