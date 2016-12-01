import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Flow } from '../../models/flow';
import { Whttp } from '../../shared/services/whttp.service';

export const ENDPOINT_FLOWS = '/api/flows';

@Injectable()
export class FlowsService {
    private flows: Flow[] = [];

    constructor(private whttp: Whttp) {
        this.binding();
    }

    public getFlows(): Promise<Flow[]> {
        return this.loadFlows();
    }

    public loadFlows(): Promise<Flow[]> {
        return this.whttp.get(ENDPOINT_FLOWS)
            .toPromise()
            .then(this.handleData)
            .then(this.saveFlowsInStore)
            .catch(this.handleError);
    }

    public getFlowById(id: String): Promise<Flow> {
        return this.whttp.get(`${ENDPOINT_FLOWS}/${id}`)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public addFlow(flow: Flow) {
        delete flow._id;
        return this.whttp.post(ENDPOINT_FLOWS, flow)
            .toPromise()
            .then(this.handleData)
            .then(this.addFlowInStore)
            .catch(this.handleError);
    }

    public removeFlow(id: Number) {
        return this.whttp.delete(`${ENDPOINT_FLOWS}/${id}`)
            .toPromise()
            .then(() => {
                this.removeFlowFromStore(id);
            })
            .catch(this.handleError);
    }

    public updateFlow(id: Number, flow: Flow) {
        return this.whttp.put(`${ENDPOINT_FLOWS}/${id}`, flow)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    private findFlowById(id: Number): Flow {
        return this.flows.find(flow => id === flow._id);
    }

    private saveFlowsInStore(flows: Flow[]): Flow[] {
        this.flows = flows;
        return this.flows;
    }

    private addFlowInStore(flow: Flow) {
        this.flows.push(flow);
    }

    private removeFlowFromStore(id: Number) {
        const flow = this.findFlowById(id);
        const index = this.flows.indexOf(flow);
        if (index > -1) {
            this.flows.splice(index, 1);
        }
    }

    private handleData(response: Response) {
        return response.json();
    }

    private handleError(error: any) {
        let errMsg = (error.message)
            ? error.message
            : error.status
            ? `${error.status} - ${error.statusText}`
            : 'Server error';

        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    private binding() {
        this.saveFlowsInStore = this.saveFlowsInStore.bind(this);
        this.addFlowInStore = this.addFlowInStore.bind(this);
    }
}
