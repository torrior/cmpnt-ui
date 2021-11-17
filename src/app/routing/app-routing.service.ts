import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '@app/core/services/authorization.service';

// Here we define routing for the App
@Injectable()
export class AppRoutingService {

  constructor(private router: Router,
    private authenticationService: AuthorizationService) {

  }

  goToMain() {
    this.router.navigate([``]);
  }

  unauthorized() {
    this.router.navigate([`401`]);
  }
}
