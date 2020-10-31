import {Component, OnInit} from '@angular/core';
import {AppWorker} from '../worker';
import {WorkerService} from '../worker.service';

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrls: ['./all-workers.component.css']
})
export class AllWorkersComponent implements OnInit {
  workers: AppWorker[];
  addFormVisible: boolean;
  addCurrentWorker: AppWorker;
  id: number;

  constructor(private workerService: WorkerService) {
  }

  ngOnInit(): void {
    this.workerService.getWorkers().subscribe((workers) => this.workers = workers);
  }

  createWorker(): void {
    this.addFormVisible = true;
    this.addCurrentWorker = undefined;
    this.id = null;
  }

  editWorker(): void {
    this.addFormVisible = true;
    this.addCurrentWorker = undefined;
  }

  deleteWorker(): void {
    this.workerService.delete(this.id).subscribe(worker => window.location.reload());
  }
}
