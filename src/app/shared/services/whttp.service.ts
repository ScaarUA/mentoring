import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export const ENDPOINT_SERVER = 'http://mentoring-program-vitalikkotliar.c9users.io:8080';

@Injectable()
export class Whttp {
    private token: string = '';

    constructor(private http: Http) {
    }

    public setToken(token: string) {
        this.token = token;
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const config = this.appendHeaders(options);
        return this.http.get(this.addPrefix(url), config);
    }

    public post(url: string, body: Object, options?: RequestOptionsArgs): Observable<Response> {
        const config = this.appendHeaders(options);
        return this.http.post(this.addPrefix(url), body, config);
    }

    public put(url: string, body: Object, options?: RequestOptionsArgs): Observable<Response> {
        const config = this.appendHeaders(options);
        return this.http.put(this.addPrefix(url), body, config);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        const config = this.appendHeaders(options);
        return this.http.delete(this.addPrefix(url), config);
    }

    public patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        const config = this.appendHeaders(options);
        return this.http.patch(this.addPrefix(url), body, config);
    }

    public addPrefix(url: string) {
        return `${ENDPOINT_SERVER}${url}`;
    }

    private appendHeaders(options: RequestOptionsArgs) {
        let headers = new Headers();
        headers.append('x-token', this.token);
        return Object.assign({}, options, { headers });
    }
}
