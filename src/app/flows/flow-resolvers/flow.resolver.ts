import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Flow } from '../../models/flow';
import { FlowsService } from '../flows-service/flows.service';

@Injectable()
export class FlowResolver implements Resolve<Flow> {
    constructor(private flowsService: FlowsService) {
    }

    public resolve(route: ActivatedRouteSnapshot): Promise<any> {
        return this.flowsService.getFlowById(route.params['id']);
    }
}
