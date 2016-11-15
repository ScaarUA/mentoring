import './state-add.scss';

import { Component } from '@angular/core';

import { State } from '../../models/state';

@Component({
    template: require('./state-add.html')
})
export class StateAddComponent {
    public state: State = new State('', '', [], '', '', new Date(), new Date(), '');

    constructor() {}

    public back() {

    }
}
