import React from 'react';
import ReactDom from 'react-dom';

class Greeting extends React.Component {
    render() {
        return '<h1>Hello, {this.props.name}</h1>';
    }
}