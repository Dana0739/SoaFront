import {Component, OnInit} from '@angular/core';
import {AppWorker} from "../worker";
import {WorkerService} from "../worker.service";

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
  workers: AppWorker[] = [];
  prefix: string;
  salary: number;
  count: number;

  constructor(private workerService: WorkerService) {
  }

  ngOnInit(): void {
  }

  getMax(): void {
    this.workerService.getWorkerWithMaxSalary().subscribe(worker => this.workers = [worker]);
  }

  getPrefix() {
    this.workerService.getWorkersWithPrefix(this.prefix).subscribe(workers => this.workers = workers);
  }

  getSalary() {
    this.workerService.getWorkersCountWithSalary(this.salary).subscribe(count => this.count = count);
  }
}
