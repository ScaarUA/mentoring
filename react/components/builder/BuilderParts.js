import React from 'react';

export default class BuilderParts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentSeries: 0 };
    }

    render() {
        return (
            <div>
                <div className="part">
                    <img src={this.props.parts[this.state.currentSeries]}/>
                </div>
                <div className="btn-group" role="group" aria-label="...">
                    <button className="btn btn-default prev"
                            onClick={() => this.prev()}>Prev</button>
                    <button className="btn btn-default add"
                            onClick={() => this.add()}>Add</button>
                    <button className="btn btn-default next"
                            onClick={() => this.next()}>Next</button>
                </div>
            </div>
        );
    }

    add() {
        const pathSeries = this.props.parts[this.state.currentSeries];
        this.props.addPart(pathSeries);
    }

    prev() {
        const length = this.getCurrentSeriesLength();
        if (this.state.currentSeries <= 0) {
            this.setState({ currentSeries: length - 1 });
        } else {
            this.setState({ currentSeries: this.state.currentSeries - 1 });
        }
    }

    next() {
        const length = this.getCurrentSeriesLength();
        if (this.state.currentSeries >= length - 1) {
            this.setState({ currentSeries: 0 });
        } else {
            this.setState({ currentSeries: this.state.currentSeries + 1 });
        }
    }

    getCurrentSeriesLength() {
        return this.props.parts
            && this.props.parts.length;
    }
}
