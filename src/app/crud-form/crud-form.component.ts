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
import {AppWorker} from '../worker';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {WorkerService} from '../worker.service';

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.css']
})
export class CrudFormComponent implements OnInit, OnChanges {

  @ViewChild('formTemplate')
  formTemplate: TemplateRef<any>;

  @Input()
  visible: boolean;

  @Input()
  worker: AppWorker;

  @Input()
  id: number;

  @Input()
  isEdit: boolean;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  formGroup: FormGroup;
  formValid: boolean;
  openedDialog: MatDialogRef<any>;
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
  organizationType = [
    {value: 'public', viewValue: 'Public'},
    {value: 'government', viewValue: 'Government'},
    {value: 'trust', viewValue: 'Trust'},
    {value: 'private_limited_company', viewValue: 'Private limited company'},
    {value: 'open_joint_stock_company', viewValue: 'Open joint stock company'}
  ];

  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog,
              private workerService: WorkerService) {
  }

  ngOnInit(): void {
    this.formValid = false;
    this.formGroup = this.formBuilder.group({
      name: [],
      coordinateX: [],
      coordinateY: [],
      salary: [],
      position: [],
      status: [],
      endDate: [],
      annualTurnover: [],
      employeesCount: [],
      organizationType: []
    });
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
    this.worker = (this.formGroup.value as AppWorker);
    if (this.isEdit) {
      this.worker.id = this.id;
    }
    // console.log(this.checkWorker(this.worker));
    if (this.checkWorker(this.worker)) {
      this.formValid = true;
      this.callSaveWorker();
    } else {
      console.log('form not valid');
      this.formValid = false;
    }
  }

  private callSaveWorker(): void {
    this.workerService.save(this.worker);
    console.log('saved');
    this.visible = false;
    this.visibleChange.emit(false);
    this.openedDialog.close();
  }

  private checkWorker(worker: AppWorker): boolean {
    return worker.position != null && worker.name != null && worker.annualTurnover != null
      && worker.organizationType != null  && worker.employeesCount != null
      && worker.coordinateX != null  && worker.coordinateY != null;
  }
}
