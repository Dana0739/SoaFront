import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppWorker} from '../worker';
import {PageEvent} from '@angular/material/paginator';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-workers-table',
  templateUrl: './workers-table.component.html',
  styleUrls: ['./workers-table.component.css']
})
export class WorkersTableComponent implements OnInit {
  @Input()
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

  constructor() {
  }

  ngOnInit(): void {
  }
}

