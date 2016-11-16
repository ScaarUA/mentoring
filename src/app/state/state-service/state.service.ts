import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { State } from '../../models/state';

@Injectable()
export class StateService {
    constructor(private http: Http) {
    }

    public saveState(state): Promise<State> {
        let formData = new FormData();

        for (let field in state) {
            if (state.hasOwnProperty(field)) {
                formData.append(field, state[field]);
            }
        }

        let headers = new Headers({ 'Content-Type': undefined });
        let options = new RequestOptions({ headers: headers });

        return fetch(`/api/states`, {
            method: 'POST',
            body: formData,
            headers
        })
            .then(this.handleData)
            .catch(this.handleError);

        // this.http.post(`/api/states`, formData, options)
        //     .toPromise()
        //     .then(this.handleData)
        //     .catch(this.handleError);
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
