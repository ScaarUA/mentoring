import './flow-list.scss';

import { Component, Input } from '@angular/core';

import { Flow } from './../../models/flow';

@Component({
    selector: 'flow-list',
    template: require('./flow-list.html')
})
export class FlowListComponent {
    @Input() public flows: Flow[];
}
