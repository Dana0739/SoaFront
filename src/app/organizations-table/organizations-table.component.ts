import {Component, Input, OnInit} from '@angular/core';
import {AppOrganization} from '../AppOrganization';

@Component({
  selector: 'app-organizations-table',
  templateUrl: './organizations-table.component.html',
  styleUrls: ['./organizations-table.component.css']
})
export class OrganizationsTableComponent implements OnInit {
  @Input()
  organizations: AppOrganization[] = [];
  displayedColumns: string[] = [
    'id',
    'annualTurnover',
    'employeesCount',
    'organizationType',
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
