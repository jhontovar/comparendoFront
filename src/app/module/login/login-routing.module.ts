import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';

/**
 * Represents the routes of the login module.
 */
const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
];

/**
 * Represents the login routing module.
 */
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class LoginRoutingModule {}
