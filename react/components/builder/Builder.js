import React from 'react';
import series from './series.js';

import BuilderParts from './BuilderParts';
import BuilderTools from './BuilderTools';
import BuilderLayers from './BuilderLayers';
import BuilderDropdown from './BuilderDropdown';

export const CANVAS = {
    WIDTH: 500,
    HEIGHT: 375
};

export const WIDTH_PART = 100;

export const WRAPPER_CANVAS_ID = 'js-canvas-wrapper';

export default class Builder extends React.Component {

    constructor(props) {
        super(props);
        this.parts = ['mask', 'nose', 'eyebrows', 'teeth'];
        this.series = series;
        this.state = {
            photo: '',
            currentPart: this.parts[0],
            currentLayer: -1,
            layers: []
        };

        window.addEventListener('load', this.startup, false);
    }


    render() {
        return (
            <div className="builder">
                <div className="col-xs-8 container-canvas">
                    <label className="btn btn-default btn-file">
                        Browse <input type="file" accept="image/*" id="input-file"
                                      onChange={(e) => this.onChangeFile(e)}/>
                    </label>
                    <button className="btn btn-info"
                            onClick={() => this.takePhoto()}>Take a photo
                    </button>
                    <button className="save btn btn-default"
                            onClick={() => this.save()}>Save
                    </button>
                    <video id="js-video" className="video">Video stream not available.</video>
                    <div>
                        <div id="js-canvas-wrapper" className="canvas-box">
                            <canvas id="js-main-canvas" className="js-canvas-item canvas-item main-canvas"
                                    width="500" height="500"/>
                        </div>
                    </div>
                </div>
                <div className="col-xs-4">
                    <div className="col-xs-10">
                        <BuilderDropdown
                            items={this.parts}
                            selected={this.state.currentPart}
                            onChange={(item) => this.onChangePart(item)}
                        />
                        <BuilderParts
                            addPart={(pathSeries) => this.addPart(pathSeries)}
                            parts={this.series[this.state.currentPart]}
                        />
                    </div>
                    <div className="col-xs-2">
                        <BuilderTools
                            layer={this.state.layers[this.state.currentLayer]}
                        />
                    </div>
                    <BuilderLayers
                        onRemove={(id) => this.remove(id)}
                        onSelect={(id) => this.select(id)}
                        currentLayer={this.state.currentLayer}
                        layers={this.state.layers}
                    />
                </div>
            </div>
        );
    }

    /** Layers */

    remove(id) {
        const layers = this.state.layers;
        const layer = layers.find(layer => layer.id === id);
        const newLayers = layers.filter((item) => item.id !== id);
        layer.element.remove();
        this.setState({ layers: newLayers, currentLayer: newLayers.length - 1 });
    }

    select(id) {
        const layers = this.state.layers;
        const layer = layers.find(layer => layer.id === id);
        const index = layers.indexOf(layer);
        this.setState({ currentLayer: index });
    }

    takePhoto() {
        const video = document.getElementById("js-video");
        const canvas = document.getElementById("js-main-canvas");
        const ctx = canvas.getContext("2d");
        const image = this.normalizeImage(video, CANVAS.WIDTH);

        ctx.drawImage(video, 0, 0, image.width, image.height);
    }

    save() {
        const mergedCanvas = this.mergeCanvas();
        const image = mergedCanvas.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.href = image;
        link.download = 'avatar.png';
        document.body.appendChild(link);
        link.click();
    }

    addPart(pathSeries) {
        const id = this.getIdLayer();
        const canvas = this.newCanvas(id);
        const ctx = canvas.getContext('2d');
        const title = this.getTitleLayer();
        const base_image = new Image();

        base_image.src = pathSeries;
        base_image.onload = () => {
            const image = this.normalizeImage(base_image, WIDTH_PART);
            ctx.drawImage(base_image, 0, 0, image.width, image.height);
            this.addLayer(id, canvas, title, image);
        }
    }


    onChangeFile(e) {
        const file = e.target.files[0];
        this.loadImage(file);
        this.setState({ photo: file });
    }

    onChangePart(part) {
        this.setState({ currentPart: part });
    }

    /** Private */

    normalizeImage(image, width) {
        const k = image.height / image.width;
        return Object.assign(image, {
            width,
            height: width * k
        })
    }

    addLayer(id, element, title, image) {
        const newLayers = this.state.layers.slice();
        const currentLayer = this.state.currentLayer;
        newLayers.push({
            id,
            element,
            title,
            image,
            width: image.width,
            height: image.height,
            x: 0,
            y: 0
        });
        this.setState({
            layers: newLayers,
            currentLayer: currentLayer + 1
        });
    }

    mergeCanvas() {
        const id = 'js-tmp-canvas';
        const tmpCanvas = this.newCanvas(id, document.body);
        const ctx = tmpCanvas.getContext('2d');
        const canvases = this.getWrapperCanvas().getElementsByClassName('js-canvas-item');
        for (let i = 0; i < canvases.length; i++) {
            let canvas = canvases[i];
            ctx.drawImage(canvas, 0, 0, CANVAS.WIDTH, CANVAS.HEIGHT);
        }
        return tmpCanvas;
    }

    getWrapperCanvas() {
        if (!this.wrapperCanvas) {
            this.wrapperCanvas = document.getElementById(WRAPPER_CANVAS_ID);
        }
        return this.wrapperCanvas;
    }

    getIdLayer() {
        const part = this.state.currentPart;
        const last = this.state.layers.length;
        return `part-${last}-${part}`;
    }

    getTitleLayer() {
        const part = this.state.currentPart;
        const last = this.state.layers.length;
        return `${last}-${part}`;
    }

    newCanvas(id, container = this.getWrapperCanvas()) {
        const canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = CANVAS.WIDTH;
        canvas.height = CANVAS.HEIGHT;
        canvas.className = 'js-canvas-item canvas-item';
        container.appendChild(canvas);
        return canvas;
    }

    loadImage(file) {
        var fr, img;
        fr = new FileReader();
        fr.onload = () => createImage();
        fr.readAsDataURL(file);

        function createImage() {
            img = new Image();
            img.onload = imageLoaded;
            img.src = fr.result;
        }

        function imageLoaded() {
            const canvas = document.getElementById("js-main-canvas");
            const ctx = canvas.getContext("2d");
            const image = this.normalizeImage(img, CANVAS.WIDTH);
            ctx.drawImage(image, 0, 0, image.width, image.height);
        }

        imageLoaded = imageLoaded.bind(this);
    }

    startup() {
        const canvas = document.getElementById('js-main-canvas');
        let streaming = false;
        let width = CANVAS.WIDTH;
        let height = CANVAS.HEIGHT;
        let video = document.getElementById("js-video");

        navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        navigator.getMedia(
            {
                video: true,
                audio: false
            },
            function (stream) {
                if (navigator.mozGetUserMedia) {
                    video.mozSrcObject = stream;
                } else {
                    var vendorURL = window.URL || window.webkitURL;
                    video.src = vendorURL.createObjectURL(stream);
                }
            },
            function (err) {
                console.log("An error occured! " + err);
            }
        );

        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);
    }
}

