import './header.html';
import './header.scss';

import { Component } from '@angular/core';

import { LocalStorageService } from '../../shared/storage/local-storage.service';
import { UsersService } from '../../users/users-service/users.service';

import { User } from '../../models/user';

const userStorageKey = 'USER';
const emptyAvatar = 'assets/images/users/empty.jpg';

@Component({
    selector: 'app-header',
    template: require('./header.html')
})
export class HeaderComponent {
    public user: User;
    public isDropdownOpened: boolean = false;

    constructor(
        private localStorageService: LocalStorageService,
        private usersService: UsersService
    ) {}

    public toggleDropdown() {
        this.isDropdownOpened = !this.isDropdownOpened;
    }

    public logout() {
        this.usersService.logout();
    }

    public isLoggedIn() {
        return this.usersService.isInStorage();
    }

    public getUserInfo() {
        let userInfo = this.localStorageService.get(userStorageKey);

        if (!userInfo.avatar) {
            userInfo.avatar = emptyAvatar;
        }

        return userInfo;
    }
}
