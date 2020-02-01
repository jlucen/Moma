import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarioComponent} from './calendario/calendario.component';

export const routes: Routes = [
 {path:"", redirectTo: "/calendario", pathMatch: "full"},
 {path: "calendario", component: CalendarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
