import '../common-styles/index.scss';
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        HeaderComponent,
        FooterComponent,
        LandingComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        JsonpModule,
        ProjectsModule,
        UsersModule,
        SharedModule,
        routing
    ]
})
export class AppModule extends Type { }
