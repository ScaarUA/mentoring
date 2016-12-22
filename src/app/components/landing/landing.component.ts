import './landing.html';
import './landing.scss';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../../users/users-service/users.service';
import { Whttp } from '../../shared/services/whttp.service';

@Component({
    selector: 'landing',
    template: require('./landing.html')
})
export class LandingComponent implements OnInit {
    private user = {};

    constructor(
        private router: Router,
        private usersService: UsersService,
        private whttp: Whttp
    ) {}

    public ngOnInit() {
        if (this.usersService.isInStorage()) {
            this.goToProjects();
        }
    }

    public login() {
        return this.usersService.login(this.user)
            .then((data: any) => this.whttp.setToken(data.token))
            .then(this.goToProjects.bind(this), this.goToAuth.bind(this));
    }

    private goToProjects() {
        this.router.navigate(['/projects']);
    }

    private goToAuth() {
        this.router.navigate(['/users/auth', {error: true}]);
    }
}
