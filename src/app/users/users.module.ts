import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserLoginComponent } from './user-login/user-login.component';
import { UsersComponent } from './users.component';

import { UsersService } from './users-service/users.service';

import { userssRouting } from './users.routing';

@NgModule({
    declarations: [
        UsersComponent,
        UserLoginComponent
    ],
    exports: [
        RouterModule
    ],
    imports: [
        CommonModule,
        userssRouting
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule {}
