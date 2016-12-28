import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { State } from '../../models/state';
import { Whttp } from '../../shared/services/whttp.service';
import { Device } from '../../shared/services/device.service';

@Injectable()
export class StateService {
    constructor(private whttp: Whttp,
                private device: Device) {
    }

    public saveState(state): Promise<State> {
        if (this.device.isPhone()) {
            this.device.phoneUpload(state);
        } else {
            this.browserUpload(state);
        }
    }

    private browserUpload(state) {
        let formData = new FormData();

        for (let field in state) {
            if (state.hasOwnProperty(field)) {
                formData.append(field, state[field]);
            }
        }

        return this.whttp.post('/api/states', formData)
            .toPromise()
            .then(this.handleData)
            .catch(this.handleError);
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
}
