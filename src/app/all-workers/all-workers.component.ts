import {Component, OnInit} from '@angular/core';
import {WorkerService} from '../worker.service';

@Component({
  selector: 'app-all-workers',
  templateUrl: './all-workers.component.html',
  styleUrls: ['./all-workers.component.css']
})
export class AllWorkersComponent implements OnInit {
  addFormVisible: boolean;
  id: number;
  isEdit: boolean;

  constructor(private workerService: WorkerService) {
  }

  ngOnInit(): void {
    this.isEdit = false;
  }

  onWorkersChanged(increased: any): void{
    this.id = increased ? (increased[0] ? increased[0].id : 0) : 0;
  }

  createWorker(): void {
    this.addFormVisible = true;
    this.isEdit = false;
  }

  editWorker(): void {
    if (!!this.id || this.id !== undefined || this.id >= 0) {
      this.addFormVisible = true;
      this.isEdit = true;
    }
  }

  deleteWorker(): void {
    if (!!this.id || this.id === 0) {
      this.workerService.delete(this.id).subscribe(() => window.location.reload());
    }
  }
}
