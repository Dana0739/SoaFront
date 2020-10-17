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
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppWorker} from "../worker";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.css']
})
export class CrudFormComponent implements OnInit, OnChanges {

  @ViewChild("formTemplate")
  formTemplate: TemplateRef<any>;

  @Input()
  visible: boolean;

  @Input()
  worker: AppWorker;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  formGroup: FormGroup;
  openedDialog: MatDialogRef<any>;
  positions = [
    {value: "laborer", viewValue: "Laborer"},
    {value: "human_resources", viewValue: "Human Resources"},
    {value: "cleaner", viewValue: "Cleaner"},
    {value: "manager_of_cleaning", viewValue: "Cleaning Manager"}
  ];
  statuses = [
    {value: "hired", viewValue: "Hired"},
    {value: "recommended_for_promotion", viewValue: "Recommended for promotion"},
    {value: "regular", viewValue: "Regular"},
    {value: "probation", viewValue: "Probation"}
  ];
  organizationType = [
    {value: "public", viewValue: "Public"},
    {value: "government", viewValue: "Government"},
    {value: "trust", viewValue: "Trust"},
    {value: "private_limited_company", viewValue: "Private limited company"},
    {value: "open_joint_stock_company", viewValue: "Open joint stock company"}
  ];

  constructor(private formBuilder: FormBuilder,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: [],
      X: [],
      Y: [],
      salary: [],
      position: [],
      status: [],
      annualTurnover: [],
      employeesCount: [],
      organizationType: []
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.visible) {
      this.openedDialog = this.matDialog.open(this.formTemplate);
      console.log("open form");
    } else {
      if (this.openedDialog) {
        this.openedDialog.close();
      }
      this.openedDialog = undefined;
    }
  }

  close() {
    console.log(this.formGroup.value);
    this.visible = false;
    this.visibleChange.emit(false);
    this.openedDialog.close();
  }
}
