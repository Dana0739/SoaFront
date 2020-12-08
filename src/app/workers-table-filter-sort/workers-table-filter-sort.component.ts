import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AppWorker} from '../worker';
import {WorkerService} from '../worker.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FilterSortArguments} from '../filterSortArguments';

@Component({
  selector: 'app-workers-table-filter-sort',
  templateUrl: './workers-table-filter-sort.component.html',
  styleUrls: ['./workers-table-filter-sort.component.css']
})
export class WorkersTableFilterSortComponent implements OnInit {

  @Output()
  workersChange: EventEmitter<AppWorker[]> = new EventEmitter<AppWorker[]>();

  formGroup: FormGroup;
  filterArguments: FilterSortArguments;
  errorMessage: string;
  filterFields: string;
  sortFields: string;
  filterValues: string;
  sortArray: string[];
  positions = [
    {value: 'laborer', viewValue: 'Laborer'},
    {value: 'human_resources', viewValue: 'Human Resources'},
    {value: 'cleaner', viewValue: 'Cleaner'},
    {value: 'manager_of_cleaning', viewValue: 'Cleaning Manager'},
    {value: null, viewValue: ''}
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
    {value: 'open_joint_stock_company', viewValue: 'Open joint stock company'},
    {value: null, viewValue: ''}
  ];

  workers: AppWorker[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'coordinateX',
    'coordinateY',
    'creationDate',
    'salary',
    'startDate',
    'endDate',
    'position',
    'status',
    'annualTurnover',
    'employeesCount',
    'organizationType',
  ];

  constructor(private formBuilder: FormBuilder,
              private workerService: WorkerService) {
  }

  ngOnInit(): void {
    this.workerService.getWorkers().subscribe((workers) => {
      this.workers = workers;
      this.workersChange.emit(workers);
    });
    this.filterFields = '';
    this.filterValues = '';
    this.errorMessage = '';
    this.sortArray = [];
    this.formGroup = this.formBuilder.group({
      id: [],
      name: [],
      coordinateX: [],
      coordinateY: [],
      creationDate: [],
      salary: [],
      startDate: [],
      endDate: [],
      position: [],
      status: [],
      annualTurnover: [],
      employeesCount: [],
      organizationType: [],
      pageSize: [],
      pageNumber: []
    });
  }

  manageSort(field: string): void {
    this.sortArray.includes(field) ?
      this.sortArray = this.sortArray.filter((value) => {
        return value !== field;
      })
      : this.sortArray.push(field);
  }

  find(): void {
    this.filterArguments = (this.formGroup.value as FilterSortArguments);
    if (this.processAllArguments(this.filterArguments)) {
      this.errorMessage = '';
      this.callGetWorkersFilterSort();
    } else {
      console.log('form not valid');
    }
  }

  private callGetWorkersFilterSort(): void {
    this.workerService.getWorkersFilterSort(this.filterFields, this.sortFields, this.filterValues,
      this.filterArguments.pageSize, this.filterArguments.pageNumber).subscribe((workers) => {
      this.workers = workers;
      this.workersChange.emit(workers);
    });
  }

  private processAllArguments(filterArguments: FilterSortArguments): boolean {
    if (this.validateFilter(filterArguments)) {
      this.makeFilterArgs(filterArguments);
      console.log(this.filterFields);
      console.log(this.filterValues);
      if (this.validatePage(filterArguments)) {
        this.sortFields = this.sortArray.join(',');
        console.log(this.sortArray);
        console.log(this.sortFields);
        return true;
      } else {
        this.errorMessage = 'page size and page number must be equal or greater than zero.';
      }
    } else {
      this.errorMessage = 'id, salary, annual turnover and employees count must be greater than zero. ' +
        'Max value of coordinate y is 444.';
    }
    return false;
  }

  private validatePage(filterArguments: FilterSortArguments): boolean {
    console.log(filterArguments.pageSize);
    console.log(filterArguments.pageNumber);
    return (!filterArguments.pageSize || filterArguments.pageSize >= 0)
      && (!filterArguments.pageNumber || filterArguments.pageNumber >= 0);
  }

  private validateFilter(filterArguments: FilterSortArguments): boolean {
    return (!filterArguments.id && filterArguments.id !== 0 || filterArguments.id > 0)
      && (!filterArguments.coordinateY || filterArguments.coordinateY < 444)
      && (!filterArguments.salary && filterArguments.salary !== 0 || filterArguments.salary > 0)
      && (!filterArguments.annualTurnover && filterArguments.annualTurnover !== 0 || filterArguments.annualTurnover > 0)
      && (!filterArguments.employeesCount && filterArguments.employeesCount !== 0 || filterArguments.employeesCount  > 0);
  }

  private makeFilterArgs(filterArguments: FilterSortArguments): void {
    this.filterValues = '';
    this.filterFields = '';
    if (filterArguments.id) {
      this.filterFields += 'id,';
      this.filterValues += filterArguments.id + ',';
    }
    if (filterArguments.name) {
      this.filterFields += 'name,';
      this.filterValues += filterArguments.name + ',';
    }
    if (filterArguments.coordinateX) {
      this.filterFields += 'coordinateX,';
      this.filterValues += filterArguments.coordinateX + ',';
    }
    if (filterArguments.coordinateY) {
      this.filterFields += 'coordinateY,';
      this.filterValues += filterArguments.coordinateY + ',';
    }
    if (filterArguments.creationDate) {
      this.filterFields += 'creationDate,';
      this.filterValues += filterArguments.creationDate + ':00.000000000+03:00,';
    }
    if (filterArguments.salary) {
      this.filterFields += 'salary,';
      this.filterValues += filterArguments.salary + ',';
    }
    if (filterArguments.startDate) {
      this.filterFields += 'startDate,';
      this.filterValues += filterArguments.startDate + ',';
    }
    if (filterArguments.endDate) {
      this.filterFields += 'endDate,';
      this.filterValues += filterArguments.endDate + ',';
    }
    if (filterArguments.position) {
      this.filterFields += 'position,';
      this.filterValues += filterArguments.position + ',';
    }
    if (filterArguments.status) {
      this.filterFields += 'status,';
      this.filterValues += filterArguments.status + ',';
    }
    if (filterArguments.annualTurnover) {
      this.filterFields += 'annualTurnover,';
      this.filterValues += filterArguments.annualTurnover + ',';
    }
    if (filterArguments.employeesCount) {
      this.filterFields += 'employeesCount,';
      this.filterValues += filterArguments.employeesCount + ',';
    }
    if (filterArguments.organizationType) {
      this.filterFields += 'organizationType,';
      this.filterValues += filterArguments.organizationType + ',';
    }
    this.filterFields = (this.filterFields === '') ? '' : this.filterFields.slice(0, -1);
    this.filterValues = (this.filterValues === '') ? '' : this.filterValues.slice(0, -1);
  }
}
