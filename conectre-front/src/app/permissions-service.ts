import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
class PermissionsService {

  constructor(private router: Router,
              private _tokenService: StorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (!this._tokenService.isTokenValido()) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles = next.data['role'] as string[];
    const userRole = this._tokenService.getRole();

    if (requiredRoles && requiredRoles.length > 0) {
      if (requiredRoles.includes(userRole) || userRole === 'ADM_TREVISAN') {
        return true;
      } else {
        this.router.navigate(['/acesso-negado']);
        return false;
      }
    } else {
      return true;
    }
  }

}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot): boolean => {
  return inject(PermissionsService).canActivate(next);
}
