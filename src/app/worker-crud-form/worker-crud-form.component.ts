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
  selector: 'app-worker-crud-form',
  templateUrl: './worker-crud-form.component.html',
  styleUrls: ['./worker-crud-form.component.css']
})
export class WorkerCrudFormComponent implements OnInit, OnChanges {

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
      salary: []
    });
    if (this.isEdit) {
      this.workerService.getWorker(this.id).subscribe(res => this.worker = res);
    } else {
      this.worker = undefined;
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
      this.worker = (this.formGroup.value as AppWorker);
      this.worker.id = this.id;
    } else {
      this.worker = (this.formGroup.value as AppWorker);
    }
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
    return worker.name != null
      && worker.name !== ''
      && worker.coordinateX != null
      && worker.coordinateY != null
      && worker.salary > 0;
  }
}
