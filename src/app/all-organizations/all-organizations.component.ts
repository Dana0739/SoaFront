import { Component, OnInit } from '@angular/core';
import {OrganizationService} from '../organization.service';
import {AppOrganization} from '../AppOrganization';

@Component({
  selector: 'app-all-organizations',
  templateUrl: './all-organizations.component.html',
  styleUrls: ['./all-organizations.component.css']
})
export class AllOrganizationsComponent implements OnInit {
  addFormVisible: boolean;
  id: number;
  isEdit: boolean;
  organizations: AppOrganization[];

  constructor(private organizationService: OrganizationService) { }

  ngOnInit(): void {
    this.isEdit = false;
    this.organizations = [];
    this.organizationService.getOrganizations().subscribe(organizations => this.organizations = organizations);
  }

  createOrganization(): void {
    this.addFormVisible = true;
    this.isEdit = false;
  }

  editOrganization(): void {
    if (!!this.id || this.id === 0) {
      this.addFormVisible = true;
      this.isEdit = true;
    }
  }

  deleteOrganization(): void {
    if (!!this.id || this.id === 0) {
      this.organizationService.delete(this.id).subscribe(() => window.location.reload());
    }
  }
}
