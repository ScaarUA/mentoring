import 'fabric';
import React, {Component} from 'react';

const fabric = window.fabric;

let canvas, cWidth, cHeight, radius, maxDistance;

let glasses, hair, lips;

export class Avatar extends Component {
    constructor() {
        super();
        this.hair = {};
        this.glasses = {};
        this.lips = {};
    }

    componentDidMount() {
        avatarGenerator();
        this.glasses = {
            glassRadius: radius / 3,
            position: 150,
            halfRounded: false
        };

        this.lips = {
            position: 120,
            emotionHeight: 0,
            mustache: false
        };
    }

    render() {
        return <div>
            <div style={{float: 'left'}}>
                <p><strong>Hair</strong></p>
                <p>Density <input type="range" min="1" max="100"
                                  onChange={e => this.changeHairDensity(e.target.value)}/></p>
                <p>length <input type="range" onChange={e => this.changeHairLength(e.target.value)}/></p>
            </div>
            <div style={{float: 'left', borderLeft: '1px solid black'}}>
                <p><strong>Glasses</strong></p>
                <p>Half rounded <input type="checkbox" onChange={e => this.changeGlassesType(e.target.checked)}/></p>
                <p>Position <input type="range" min="100" max="200"
                                   onChange={e => this.changeGlassesPosition(e.target.value)}/></p>
                <p>Radius <input type="range" min="10" max="100"
                                 onChange={e => this.changeGlassesRadius(e.target.value)}/></p>
            </div>
            <div style={{float: 'left', borderLeft: '1px solid black'}}>
                <p><strong>Lips</strong></p>
                <p>Mustache <input type="checkbox" onChange={e => this.changeLipsMustache(e.target.checked)}/></p>
                <p>Position <input type="range" min="60" max="180"
                                   onChange={e => this.changeLipsPosition(e.target.value)}/></p>
                <p>Happiness <input type="range" min="-30" max="30"
                                    onChange={e => this.changeLipsEmotion(e.target.value)}/></p>
            </div>
            <div style={{overflow: 'hidden', clear: 'both'}}>
                <canvas id="canvas" width="500px" height="500px"/>
            </div>
            <a id="download" href="#" onClick={() => this.download()}>Download avatar</a>
        </div>;
    }

    changeHairDensity(density) {
        density = parseInt(density, 10);
        this.hair.density = density;

        canvas.remove(hair);
        makeHair(this.hair);
    }

    changeHairLength(length) {
        length = parseInt(length, 10);
        this.hair.length = length;

        canvas.remove(hair);
        makeHair(this.hair);
    }

    changeGlassesType(halfRounded) {
        this.glasses.halfRounded = halfRounded;

        canvas.remove(glasses);
        makeGlasses(this.glasses);
    }

    changeGlassesPosition(position) {
        position = parseInt(position, 10);
        this.glasses.position = position;

        canvas.remove(glasses);
        makeGlasses(this.glasses);
    }

    changeGlassesRadius(glassRadius) {
        glassRadius = parseInt(glassRadius, 10);
        this.glasses.glassRadius = glassRadius;

        canvas.remove(glasses);
        makeGlasses(this.glasses);
    }

    changeLipsMustache(mustache) {
        this.lips.mustache = mustache;

        canvas.remove(lips);
        makeLips(this.lips);
    }

    changeLipsPosition(position) {
        position = parseInt(position, 10);
        this.lips.position = position;

        canvas.remove(lips);
        makeLips(this.lips);
    }

    changeLipsEmotion(emotionHeight) {
        emotionHeight = parseInt(emotionHeight, 10);
        this.lips.emotionHeight = emotionHeight;

        canvas.remove(lips);
        makeLips(this.lips);
    }

    download() {
        // eslint-disable-next-line
        $('<a />').attr({href: canvas.toDataURL({
            format: 'png',
            quality: 0.3
        }), download: 'avatar.png'})[0].click();
    }
}

function avatarGenerator() {
    canvas = new fabric.Canvas('canvas', {
        backgroundColor: '#fff'
    });

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
        halfRounded: false
    });

    makeLips({
        verticalPosition: 120,
        emotionHeight: -10,
        mustache: false

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
    let position = params.position || 100,
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

    lips = new fabric.Group(figures);

    lips.set('selectable', false);

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