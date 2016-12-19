import React from 'react';

export default class BuilderLayers extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentSeries: 0 };
    }

    render() {
        const layers = this.props.layers.map((layer) => {
            return <li key={layer.id}
                       onClick={() => this.props.onSelect(layer.id)}
                       className={"list-group-item " + (this.isCurrentLayer(layer) ? 'list-group-item-success' : '')}>
                <span className="title">{layer.title}</span>
                <span className="glyphicon glyphicon-remove remove"
                      onClick={() => this.props.onRemove(layer.id)}></span>
            </li>

        });
        return (
            <div className="layers">
                <h3>{this.props.layers.length ? 'Layers:': ''}</h3>
                <ul className="list-group">
                    {layers}
                </ul>
            </div>
        );
    }

    isCurrentLayer(layer) {
        const index = this.props.layers.indexOf(layer);
        return index === this.props.currentLayer;
    }
}
