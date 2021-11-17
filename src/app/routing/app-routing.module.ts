import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeComponent } from '@app/pages/me/me.component';
import { MainComponent } from '@app/pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'me', component: MeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
