import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkersTableComponent} from './workers-table/workers-table.component';
import {CommandsComponent} from './commands/commands.component';
import {AllWorkersComponent} from './all-workers/all-workers.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/table'
  },
  {
    path: 'table',
    component: AllWorkersComponent
  },
  {
    path: 'commands',
    component: CommandsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
