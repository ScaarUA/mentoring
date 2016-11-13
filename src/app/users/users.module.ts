import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { UserAuthComponent } from './user-auth/user-auth.component';
import { UsersComponent } from './users.component';

import { UsersService } from './users-service/users.service';

import { userssRouting } from './users.routing';

@NgModule({
    declarations: [
        UsersComponent,
        UserAuthComponent
    ],
    exports: [
        RouterModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        userssRouting
    ],
    providers: [
        UsersService
    ]
})
export class UsersModule {}
