import { Injectable } from '@angular/core';
import { Whttp } from './whttp.service';

@Injectable()
export class Device {
    constructor(private whttp: Whttp) {
        this.phoneUpload = this.phoneUpload.bind(this);
        this.onSuccessUpload = this.onSuccessUpload.bind(this);
        this.onFailUpload = this.onFailUpload.bind(this);
    }

    public isPhone(): boolean {
        return Boolean(window.cordova);
    }

    public phoneUpload(state) {
        const url = encodeURI(this.whttp.addPrefix('/api/states'));
        const fileURI = state.file;
        const options = this.getOptions(state, fileURI);
        const ft = new FileTransfer();
        ft.upload(fileURI, url, this.onSuccessUpload, this.onFailUpload, options);
    }

    private getOptions(state, fileURI) {
        let options = new FileUploadOptions();
        options.fileKey = 'file';
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = 'image/jpeg';
        options.headers = { 'x-token': this.whttp.getToken() };
        options.params = {
            description: state.description,
            hotspot: state.hotspot,
            flow: state.flow,
            onCloud: state.onCloud,
        };
        return options;
    }

    private onSuccessUpload() {
        this.clearCache();
        alert('Done!');
    }

    private onFailUpload() {
        alert('Ups. Something wrong happens!');
    }

    private clearCache() {
        navigator.camera.cleanup();
    }
}
