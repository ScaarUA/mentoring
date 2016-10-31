import './app.html';
import '../common-styles/index.scss';
import './app.scss';

import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: require('./app.html'),
})
export class AppComponent {
}
