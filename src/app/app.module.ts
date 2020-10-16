import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { WorkersTableComponent } from './workers-table/workers-table.component';

@NgModule({
  declarations: [
    AppComponent,
    WorkersTableComponent,
  ],
  imports: [
    MatTableModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
