import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppWorker} from "../worker";
import {PageEvent} from "@angular/material/paginator";

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.css']
})
export class WorkersTableComponent implements OnInit, OnChanges {
  @Input()
  workers: AppWorker[] = [];
  displayed: AppWorker[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'coordinateX',
    'coordinateY',
    'annualTurnover',
    'creationDate',
    'endDate',
    'employeesCount',
    'organizationType',
    'salary',
    'status',
    'position',
  ];
  length = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.workers) {
      this.pageIndex = 0;
      this.length = this.workers.length;
      this.displayed = this.workers.slice(0, this.pageSize);
    }
  }

  pageChange(event: PageEvent): void {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.displayed = this.workers.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize);
  }
}

