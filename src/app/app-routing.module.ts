import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PorfolioComponent } from './components/porfolio/porfolio.component';
import { InboxComponent } from './inbox/inbox.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'porfolio', component: PorfolioComponent },
  { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'porfolio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
