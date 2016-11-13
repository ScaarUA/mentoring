import './user-auth.html';
import './user-auth.scss';

import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../users-service/users.service';

@Component({
    template: require('./user-auth.html')
})
export class UserAuthComponent implements OnInit, OnDestroy {
    public error: String = 'You\'ve put wrong email or password';
    private _isError: Boolean = false;
    private user = {};
    private title: String = 'Login';
    private querySubscription: Subscription;
    private paramsSubscription: Subscription;

    constructor(
        private usersService: UsersService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    public ngOnInit() {
        if (this.usersService.isInStorage()) {
            this.goToProjects();
        }

        this.querySubscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                if (param['from-google']) {
                    this.usersService.getCurrentUser()
                        .then(this.goToProjects.bind(this));
                }
            });

        this.paramsSubscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                if (param['error']) {
                    this._isError = true;
                }
            }
        );

    }

    public ngOnDestroy() {
        this.querySubscription.unsubscribe();
        this.paramsSubscription.unsubscribe();
    }

    public getTitle() {
        return this.title;
    }

    public isLogin() {
        return this.title === 'Login';
    }

    public changeMode() {
        this._isError = false;
        this.user = {};
        this.changeTitle();
    }

    public login() {
        return this.usersService.login(this.user)
            .then(this.goToProjects.bind(this), this.toggleError.bind(this));
    }

    public register() {
        return this.usersService.register(this.user)
            .then(this.login.bind(this), this.toggleError.bind(this));
    }

    public submit() {
        if (this.isLogin()) {
            this.login();
        } else {
            this.register();
        }
    }

    public isError() {
        return this._isError;
    }

    public toggleError() {
        this._isError = !this._isError;
    }

    private goToProjects() {
        this.router.navigate(['/projects']);
    }

    private changeTitle() {
        this.title = this.isLogin() ? 'Registration' : 'Login';
    }
}
