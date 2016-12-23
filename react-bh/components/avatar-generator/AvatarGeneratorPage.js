import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'fabric';

const fabric = window.fabric;

let canvas, cWidth, cHeight, radius, maxDistance;

class AvatarGeneratorPage extends Component {
    componentDidUpdate() {

    }

    render() {
        if (!this.props.isLoggedIn) {
            setTimeout(avatarGenerator, 200);
        }
        const {isLoggedIn} = this.props;

        return <div>
            <h4>{!isLoggedIn ? <canvas id="canvas" width="500px" height="500px" /> : 'You\'re not logged in, please login'}</h4>
        </div>;
    }
}

function avatarGenerator() {
    canvas = new fabric.Canvas('canvas');

    cWidth = canvas.width;
    cHeight = canvas.height;

    radius = cWidth*0.8/2;

    maxDistance = Math.max(cWidth, cHeight);

    let rect = new fabric.Circle({
        left: maxDistance*0.5 - radius,
        top: maxDistance*0.5 - radius,
        fill: 'rgba(0,0,0,0)',
        radius: radius,
        stroke: 'black'
    });

    rect.set('selectable', false);

// "add" rectangle onto canvas
    canvas.add(rect);

    makeGlasses();
}

function makeGlasses() {
    let x1 = maxDistance*0.5 - radius,
        y1 = maxDistance*0.5 - radius/2;

    let x2 = maxDistance*0.5 + radius,
        y2 = y1;

    let line = new fabric.Line([x1, y1, x2, y2], {
        stroke: 'black',
        strokeWidth: 3
    });

    canvas.add(line);
}

function mapStateToProps(state) {
    return state.accessibility;
}

export default connect(mapStateToProps)(AvatarGeneratorPage);