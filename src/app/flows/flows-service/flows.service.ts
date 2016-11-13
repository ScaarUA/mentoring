import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Flow } from '../../models/flow';

export const ENDPOINT_FLOWS = '/api/flows';

@Injectable()
export class FlowsService {
    private flows: Flow[] = [];

    constructor(private http: Http) {
        this.binding();
    }

    public getFlows(): Promise<Flow[]> {
        return this.loadFlows();
    }

    public loadFlows(): Promise<Flow[]> {
        return this.http.get(ENDPOINT_FLOWS)
            .toPromise()
            .then(this.handleData)
            .then(this.saveFlowsInStore)
            .catch(this.handleError);
    }

    public getFlowById(id: String): Promise<Flow> {
        return this.http.get(`${ENDPOINT_FLOWS}/${id}`)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
    }

    public addFlow(flow: Flow) {
        delete flow._id;
        return this.http.post(ENDPOINT_FLOWS, flow)
            .toPromise()
            .then(this.handleData)
            .then(this.addFlowInStore)
            .catch(this.handleError);
    }

    public removeFlow(id: Number) {
        return this.http.delete(`${ENDPOINT_FLOWS}/${id}`)
            .toPromise()
            .then(() => {
                this.removeFlowFromStore(id);
            })
            .catch(this.handleError);
    }

    public updateFlow(id: Number, flow: Flow) {
        return this.http.put(`${ENDPOINT_FLOWS}/${id}`, flow)
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
