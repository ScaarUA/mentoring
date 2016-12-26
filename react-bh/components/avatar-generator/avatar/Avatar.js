import 'fabric';
import React, {Component} from 'react';

const fabric = window.fabric;

let canvas, cWidth, cHeight, radius, maxDistance;

let glasses, hair;

export class Avatar extends Component {
    constructor() {
        super();
        this.hair = {};
    }

    componentDidMount() {
        avatarGenerator();
    }

    render() {
        return <div>
            <p>Hair</p>
            <p>Density <input type="number" onChange={e => this.changeHairDensity(e.target.value)}/></p>
            <p>length <input type="range" onChange={e => this.changeHairLength(e.target.value)}/></p>
            <canvas id="canvas" width="500px" height="500px" />
        </div>;
    }

    changeHairDensity(density) {
        density = parseInt(density, 10);
        this.hair.density = density;

        let params = {
            density,
            length: this.hair.length
        };

        canvas.remove(hair);
        makeHair(params);
    }

    changeHairLength(length) {
        length = parseInt(length, 10);
        this.hair.length = length;

        let params = {
            density: this.hair.density,
            length
        };

        canvas.remove(hair);
        makeHair(params);
    }
}

function avatarGenerator() {
    canvas = new fabric.Canvas('canvas');

    cWidth = canvas.width;
    cHeight = canvas.height;

    radius = cWidth * 0.8 / 2;

    maxDistance = Math.max(cWidth, cHeight);

    let rect = new fabric.Circle({
        left: maxDistance * 0.5 - radius,
        top: maxDistance * 0.5 - radius,
        fill: 'rgba(0,0,0,0)',
        radius: radius,
        stroke: '#000'
    });

    rect.set('selectable', false);

    canvas.add(rect);

    makeGlasses({
        glassRadius: radius / 3,
        position: 150,
        halfRounded: true
    });

    makeLips({
        verticalPosition: 120,
        emotionHeight: -10,
        mustache: true

    });

    makeHair({
        density: 100,
        length: 40
    });
}

function makeGlasses(params) {
    let x1 = maxDistance * 0.5 - radius,
        glassLength = params.halfRounded ? Math.PI : Math.PI * 2,
        glassRadius = params.glassRadius || radius / 2,
        position = params.position || 150;


    let line = new fabric.Line([0, 0, radius * 2, 0], {
        stroke: 'black',
        strokeWidth: 3
    });

    let leftGlass = new fabric.Circle({
        radius: glassRadius,
        left: 0,
        top: -glassRadius,
        startAngle: 0,
        endAngle: glassLength,
        stroke: '#000',
        strokeWidth: 3,
        fill: '#000'
    });

    let rightGlass = new fabric.Circle({
        radius: glassRadius,
        left: radius * 2 - glassRadius * 2,
        top: -glassRadius,
        startAngle: 0,
        endAngle: glassLength,
        stroke: '#000',
        strokeWidth: 3,
        fill: '#000'
    });

    glasses = new fabric.Group([leftGlass, rightGlass, line], {
        left: x1,
        top: position - glassRadius
    });

    glasses.set('selectable', false);

    canvas.add(glasses);
}

function makeLips(params) {
    let position = params.verticalPosition || 100,
        emotionHeight = params.emotionHeight || 0,
        figures = [];

    let lipsDots = [
        {x: maxDistance / 2 - 70, y: maxDistance / 2 + position + emotionHeight},
        {x: maxDistance / 2 - 50, y: maxDistance / 2 + position},
        {x: maxDistance / 2 + 50, y: maxDistance / 2 + position},
        {x: maxDistance / 2 + 70, y: maxDistance / 2 + position + emotionHeight}
    ];

    let mouth = new fabric.Polyline(lipsDots, {
        stroke: '#000',
        strokeWidth: 3,
        fill: null
    });

    figures.push(mouth);

    if (params.mustache) {
        let mustache = new fabric.Polyline(lipsDots, {
            stroke: '#000',
            strokeWidth: 3,
            top: maxDistance / 2 + position - 17
        });

        figures.push(mustache);
    }

    let lips = new fabric.Group(figures);

    mouth.set('selectable', false);

    canvas.add(lips);
}

function makeHair(params) {
    let hairLines = [],
        density = params.density || 100,
        length = params.length || 10;

    for (let i = 0; i < density; i++) {
        let line = new fabric.Line([
            maxDistance / 4 + Math.random() * maxDistance / 2, Math.random() * 20 + 80,
            maxDistance / 4 + Math.random() * maxDistance / 2, Math.random() * 20 + 80 - length
        ], {
            strokeWidth: 3,
            stroke: '#000'
        });

        hairLines.push(line);
    }

    hair = new fabric.Group(hairLines);

    hair.set('selectable', false);

    canvas.add(hair);
}