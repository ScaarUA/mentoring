import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { State } from '../../models/state';

@Injectable()
export class StateService {
    constructor() {
    }

    public saveState(state): Promise<State> {
        let formData = new FormData();

        for (let field in state) {
            if (state.hasOwnProperty(field)) {
                formData.append(field, state[field]);
            }
        }

        const config = {
            method: 'POST',
            body: formData
        };

        return window.fetch('/api/states', config)
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
