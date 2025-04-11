import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { EventComponent } from './component/event/event.component';
import { ViewDetailsComponent } from './component/view-details/view-details.component';
import { BookingComponent } from './component/booking/booking.component';
import { authGuardGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'events', component: EventComponent, canActivate: [authGuardGuard] },
  { path: 'event/:id', component: ViewDetailsComponent, canActivate: [authGuardGuard] },

  // ✅ FIXED BOOKING ROUTE
  { path: 'event/book/:id', component: BookingComponent, canActivate: [authGuardGuard] },

  // Catch-all fallback
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
