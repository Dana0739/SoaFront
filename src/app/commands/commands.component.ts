import {Component, OnInit} from '@angular/core';
import {AppWorker} from '../worker';
import {WorkerService} from '../worker.service';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
  workers: AppWorker[] = [];
  prefix: string;
  salary: number;
  id: number;
  count: number;
  idValid: boolean;
  salaryValid: boolean;

  constructor(private workerService: WorkerService) {
  }

  ngOnInit(): void {
    this.prefix = '';
    this.salary = 1;
    this.id = 1;
    this.checkSalary();
    this.checkId();
  }

  getMax(): void {
    this.workers = [];
    this.workerService.getWorkerWithMaxSalary().subscribe(worker => this.workers = [worker]);
  }

  getPrefix(): void {
    if (this.prefix === undefined || this.prefix === null) {
      this.prefix = '';
    }
    this.workers = [];
    this.workerService.getWorkersWithPrefix(this.prefix).subscribe(workers => this.workers = workers);
  }

  getSalary(): void {
    if (this.checkSalary()) {
      this.count = null;
      this.workerService.getWorkersCountWithSalary(this.salary).subscribe(count => this.count = count);
    }
  }

  getWorkerById(): void {
    if (this.checkId()) {
      this.workers = [];
      this.workerService.getWorker(this.id).subscribe(worker => this.workers = [worker]);
    }
  }

  checkId(): boolean {
    if (this.id === undefined || this.id === null || this.id <= 0) {
      this.idValid = false;
      return false;
    } else {
      this.idValid = true;
      return true;
    }
  }

  checkSalary(): boolean {
    if (this.salary === undefined || this.salary === null || this.salary <= 0) {
      this.salaryValid = false;
      return false;
    } else {
      this.salaryValid = true;
      return true;
    }
  }
}
