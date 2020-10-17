import {Component, OnInit} from '@angular/core';
import {AppWorker} from "../worker";
import {WorkerService} from "../worker.service";

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrls: ['./all-workers.component.css']
})
export class AllWorkersComponent implements OnInit {
  workers: AppWorker[];
  formVisible: boolean;
  currentWorker: AppWorker;

  constructor(private workerService: WorkerService) {
  }

  ngOnInit(): void {
    this.workerService.getWorkers()
      .subscribe(workers => this.workers = workers);
  }

  createWorker() {
    this.formVisible = true;
    this.currentWorker = undefined;
  }
}
