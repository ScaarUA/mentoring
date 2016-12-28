import './state-add.scss';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { StateService } from '../state-service/state.service';
import { Device } from '../../shared/services/device.service';

import { State } from '../../models/state';

@Component({
    template: require('./state-add.html')
})
export class StateAddComponent implements OnInit, OnDestroy {
    public state: State = new State('', '', [], '', 'Description', new Date(), new Date());
    public titleEditable: boolean = true;
    public descriptionEditable: boolean = false;
    public imageShown: boolean = false;
    public hotspotCreationProcess: boolean = false;
    public hotspotTempData: any = {};
    private stateElement: HTMLElement;
    private hotspot: HTMLElement;
    private hotspotX: number;
    private hotspotY: number;
    private subscription: Subscription;
    private flowId: string;
    private pictureSource: string;
    private destinationType: any;

    constructor(private stateService: StateService,
                private router: Router,
                private device: Device,
                private activatedRoute: ActivatedRoute) {
    }

    public ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.flowId = param['id'];
            });
        this.onDeviceReady = this.onDeviceReady.bind(this);
        this.onPhotoSuccess = this.onPhotoSuccess.bind(this);
        this.onPhotoFail = this.onPhotoFail.bind(this);
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public selectFile($event) {
        this.state.file = $event.target.files[0];
    }

    public toggleTitle() {
        this.titleEditable = !this.titleEditable;
        if (this.state.title === '') {
            this.state.title = 'Title';
        }
    }

    public toggleDescription() {
        this.descriptionEditable = !this.descriptionEditable;
        if (this.state.description === '') {
            this.state.description = 'description';
        }
    }

    public toggleImage() {
        this.imageShown = !this.imageShown;
        if (!this.imageShown) {
            this.hotspotCreationProcess = false;
        }
    }

    public createHotspot(event) {
        this.stateElement = event.target;
        let elementWidth = this.stateElement.offsetWidth;
        let elementHeight = this.stateElement.offsetHeight;
        let xPx = event.offsetX;
        let yPx = event.offsetY;

        this.hotspotX = (xPx - 25) * 100 / elementWidth;
        this.hotspotY = (yPx - 25) * 100 / elementHeight;
        this.hotspot = document.createElement('div');

        this.hotspot.className = 'state-add-container__hotspot';
        this.hotspot.style.top = `${this.hotspotY}%`;
        this.hotspot.style.left = `${this.hotspotX}%`;

        this.stateElement.appendChild(this.hotspot);

        this.hotspotCreationProcess = true;
    }

    public addHotspot() {
        let hotspotObj = {
            // TODO need to include stateId somehow
            title: this.hotspotTempData.title,
            description: this.hotspotTempData.description,
            x: this.hotspotX,
            y: this.hotspotY
        };

        this.hotspot.title = hotspotObj.title;
        this.state.hotspots.push(hotspotObj);
        this.hotspotCreationProcess = false;
        this.hotspotTempData = {};
        this.hotspot = null;
    }

    public removeHotspot() {
        this.stateElement.removeChild(this.hotspot);
        this.hotspotCreationProcess = false;
    }

    public saveState() {
        this.stateService.saveState(this.state);

        this.router.navigate([]);
    }

    public isShowTakePhoto() {
        return this.device.isPhone();
    }

    public takePhoto() {
        const options = {
            quality: 50,
            destinationType: this.destinationType.FILE_URI
        };
        navigator.camera.getPicture(this.onPhotoSuccess, this.onPhotoFail, options);
    }

    private onPhotoSuccess(fileURI: any) {
        this.state.file = fileURI;
    }

    private onPhotoFail(message: string) {
        alert('Failed photo: ' + message);
    }

    private onDeviceReady() {
        this.pictureSource = navigator.camera.PictureSourceType;
        this.destinationType = navigator.camera.DestinationType;
    }
}
