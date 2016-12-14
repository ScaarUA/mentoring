import React, { Component } from 'react';
import { connect } from 'react-redux';
// import 'fabric';

const fabric = window.fabric;

let canvas;

class AvatarGeneratorPage extends Component {
    componentDidUpdate() {

    }

    render() {
        if (this.props.isLoggedIn) {
            setTimeout(avatarGenerator, 200);
        }
        const {isLoggedIn} = this.props;

        return <div>
            <h4>{isLoggedIn ? <canvas id="canvas" width="500px" height="500px" /> : 'You\'re not logged in, please login'}</h4>
        </div>;
    }
}

function avatarGenerator() {
    canvas = new fabric.Canvas('canvas');

    let cWidth = canvas.width,
        cHeight = canvas.height;

    let radius = cWidth*0.8/2;

    var rect = new fabric.Circle({
        left: cWidth*0.5 - radius,
        top: cHeight*0.5 - radius,
        fill: 'rgba(0,0,0,0)',
        radius: radius,
        stroke: 'black'
    });

    rect.set('selectable', false);

// "add" rectangle onto canvas
    canvas.add(rect);
}

function mapStateToProps(state) {
    return state.accessibility;
}

export default connect(mapStateToProps)(AvatarGeneratorPage);