import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export const ENDPOINT_SERVER = 'http://mentoring-program-vitalikkotliar.c9users.io:8080';

@Injectable()
export class Whttp {
    constructor(private http: Http) {}

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.addPrefix(url), options);
    }

    public post(url: string, body: Object, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.addPrefix(url), body, options);
    }

    public put(url: string, body: Object, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.put(this.addPrefix(url), body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.delete(this.addPrefix(url), options);
    }

    public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.patch(this.addPrefix(url), body, options);
    }

    private addPrefix(url: string) {
        return `${ENDPOINT_SERVER}${url}`;
    }
}
