import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {OrganizationService} from '../organization.service';
import {AppOrganization} from '../AppOrganization';

@Component({
  selector: 'app-organization-crud-form',
  templateUrl: './organization-crud-form.component.html',
  styleUrls: ['./organization-crud-form.component.css']
})
export class OrganizationCrudFormComponent implements OnInit, OnChanges {

  @ViewChild('formTemplate')
  formTemplate: TemplateRef<any>;

  @Input()
  visible: boolean;

  @Input()
  organization: AppOrganization;

  @Input()
  id: number;

  @Input()
  isEdit: boolean;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  formGroup: FormGroup;
  formValid: boolean;
  openedDialog: MatDialogRef<any>;

  organizationType = [
    {value: 'public', viewValue: 'Public'},
    {value: 'government', viewValue: 'Government'},
    {value: 'trust', viewValue: 'Trust'},
    {value: 'private_limited_company', viewValue: 'Private limited company'},
    {value: 'open_joint_stock_company', viewValue: 'Open joint stock company'}
  ];

  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.formValid = false;
    this.formGroup = this.formBuilder.group({
      annualTurnover: [],
      employeesCount: [],
      organizationType: []
    });
    if (this.isEdit) {
      this.organizationService.getOrganization(this.id).subscribe(res => this.organization = res);
    } else {
      this.organization = undefined;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.visible) {
      this.openedDialog = this.matDialog.open(this.formTemplate);
      console.log('open form');
    } else {
      if (this.openedDialog) {
        this.openedDialog.close();
      }
      this.openedDialog = undefined;
    }
  }

  close(): void {
    console.log(this.formGroup.value);
    this.visible = false;
    this.visibleChange.emit(false);
    this.openedDialog.close();
  }

  ok(): void {
    if (this.isEdit) {
      this.organization = (this.formGroup.value as AppOrganization);
      this.organization.id = this.id;
    } else {
      this.organization = (this.formGroup.value as AppOrganization);
    }
    if (this.checkOrganization(this.organization)) {
      this.formValid = true;
      this.callSaveOrganization();
    } else {
      console.log('form not valid');
      this.formValid = false;
    }
  }

  private callSaveOrganization(): void {
    this.organizationService.save(this.organization);
    console.log('saved');
    this.visible = false;
    this.visibleChange.emit(false);
    this.openedDialog.close();
  }

  private checkOrganization(organization: AppOrganization): boolean {
    return organization.annualTurnover > 0
      && organization.employeesCount > 0;
  }
}
