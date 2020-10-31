import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import {AppComponent} from './app.component';
import {WorkersTableComponent} from './workers-table/workers-table.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {CommandsComponent} from './commands/commands.component';
import {AllWorkersComponent} from './all-workers/all-workers.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CrudFormComponent} from './crud-form/crud-form.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    WorkersTableComponent,
    CommandsComponent,
    AllWorkersComponent,
    CrudFormComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
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
