import {Component} from '@angular/core';
import {AppWorker} from "../worker";
import {Router} from "@angular/router";
import { WorkerService } from '../worker.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.css']
})
export class WorkersTableComponent {
  workers: AppWorker[] = [];

  constructor(
    private router: Router,
    private workerService: WorkerService) {
  }

  ngOnInit(): void {
    this.workerService.getWorkers()
      .subscribe(workers => this.workers = workers.slice(1, 5));
  }

  displayedColumns: string[] = ['id', 'name'];
}

