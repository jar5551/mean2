/**
 * Created by jarek on 26/11/2016.
 */
import {Routes, RouterModule, CanActivate} from '@angular/router';

import {LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  /*{
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },*/
  {
    path: '',
    component: LoginComponent
  }
  /*{
   path: 'special',
   component: PrivateDealsComponent,
   // We'll use the canActivate API and pass in our AuthGuard. Now any time the /special route is hit, the AuthGuard will run first to make sure the user is logged in before activating and loading this route.
   canActivate: [AuthGuard]
   }*/
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [LoginComponent];