import { ErrorPageComponent } from './error-page/error-page.component';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UsersComponent } from './users/users.component';
import { ServerResolver } from './servers/server/server-resolver.service';

  const appRoutes: Routes = [
    {path: '', component:  HomeComponent},
    {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UsersComponent}
    ]},
    {path: 'servers',
      // canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      component: ServersComponent,
      children: [
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]}
    ]},
    //This path should be always at the end of the paths.
      // {path: 'not-found', component: PageNotFoundComponent},
      {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
      // pathMatch: Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example
      {path: '**', redirectTo: '/not-found', pathMatch: 'full'}
  ];

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
