import { Injectable }  from '@angular/core';
import { CanActivate, CanActivateChild, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from '../users/users-service/users.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private usersService: UsersService,
        private router: Router
    ) {}
// tslint:disable-next-line:no-unused-variable
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>|boolean {
        return this.usersService.getCurrentUser()
            .then(function () {
                return true;
            }, this.unauthorized.bind(this, state.url));
    }

    public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>|boolean {
        return this.canActivate(route, state);
    }

    private unauthorized(url) {
        this.usersService.redirectUrl = url;

        this.router.navigate(['/users/auth', {session: 'expired'}]);

        return false;
    }
}
