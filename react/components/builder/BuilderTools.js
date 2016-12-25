import React from 'react';

export const COEFFICIENT_REDUCE = 0.9;
export const COEFFICIENT_INCREASE = 1.1;
export const SHIFT = 3;

export default class BuilderTools extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tools" onMouseUp={() => this.onMouseUp()}>
                <span className="increase glyphicon glyphicon-plus-sign"
                      onMouseDown={() => this.increase()}></span>
                <span className="reduce glyphicon glyphicon-minus-sign"
                      onMouseDown={() => this.reduce()}></span>

                <div className="direction-button">
                    <span className="glyphicon glyphicon-triangle-left"
                          onMouseDown={() => this.shiftLeft()}></span>
                    <span className="shift-right glyphicon glyphicon-triangle-right"
                          onMouseDown={() => this.shiftRight()}></span>
                    <span className="shift-up glyphicon glyphicon-triangle-top"
                          onMouseDown={() => this.shiftUp()}></span>
                    <span className="shift-down glyphicon glyphicon-triangle-bottom"
                          onMouseDown={() => this.shiftDown()}></span>
                </div>
            </div>
        );
    }

    stopOption() {
        clearInterval(this.interval);
    }

    runOption(func) {
        if (!this.props.layer) {
            alert(`Layer doesn't chosen`);
            this.stopOption();
            return;
        }
        this.interval = setInterval(() => {
            func && func();
        }, 50);
    }

    onMouseUp() {
        this.stopOption();
    }

    shiftLeft() {
        this.runOption(() => {
            this.shift(-SHIFT, 0);
        });
    }

    shiftRight() {
        this.runOption(() => {
            this.shift(SHIFT, 0);
        });
    }

    shiftDown() {
        this.runOption(() => {
            this.shift(0, SHIFT);
        });
    }

    shiftUp() {
        this.runOption(() => {
            this.shift(0, -SHIFT);
        });
    }

    reduce() {
        this.runOption(() => {
            this.size(COEFFICIENT_REDUCE);
        });
    }

    increase() {
        this.runOption(() => {
            this.size(COEFFICIENT_INCREASE);
        });
    }

    /** Privates */
    shift(x, y) {
        const canvas = this.props.layer.element;
        const ctx = canvas.getContext('2d');
        const layer = this.props.layer;
        const image = layer.image;
        layer.x = layer.x + x * layer.width / 80;
        layer.y = layer.y + y * layer.width / 80;
        ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(image, layer.x, layer.y, layer.width, layer.height);
    }

    size(coefficient) {
        const canvas = this.props.layer.element;
        const ctx = canvas.getContext('2d');
        const layer = this.props.layer;
        const image = layer.image;
        const newWidth = layer.width * coefficient;
        const newHeight = layer.height * coefficient;
        layer.width = newWidth;
        layer.height = newHeight;
        ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(image, layer.x, layer.y, newWidth, newHeight);
    }
}
