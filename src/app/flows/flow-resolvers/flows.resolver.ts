import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Flow } from '../../models/flow';
import { FlowsService } from '../flows-service/flows.service';

@Injectable()
export class FlowsResolver implements Resolve<Flow> {
    constructor(private flowsService: FlowsService) {
    }

    public resolve(): Promise<any> {
        return this.flowsService.getFlows();
    }
}
