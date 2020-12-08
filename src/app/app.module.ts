import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import {AppComponent} from './app.component';
import {WorkersTableComponent} from './workers-table/workers-table.component';
import {HttpClientModule} from '@angular/common/http';
import {CommandsComponent} from './commands/commands.component';
import {AllWorkersComponent} from './all-workers/all-workers.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkerCrudFormComponent} from './worker-crud-form/worker-crud-form.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { WorkersTableFilterSortComponent } from './workers-table-filter-sort/workers-table-filter-sort.component';
import { AllOrganizationsComponent } from './all-organizations/all-organizations.component';
import { OrganizationsTableComponent } from './organizations-table/organizations-table.component';
import { HrRpcComponent } from './hr-rpc/hr-rpc.component';
import { OrganizationCrudFormComponent } from './organization-crud-form/organization-crud-form.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkersTableComponent,
    CommandsComponent,
    AllWorkersComponent,
    WorkerCrudFormComponent,
    WorkersTableFilterSortComponent,
    AllOrganizationsComponent,
    OrganizationsTableComponent,
    HrRpcComponent,
    OrganizationCrudFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    OverlayModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
