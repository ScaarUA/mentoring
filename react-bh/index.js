import React from 'react';
import { render } from 'react-dom';
import { TestClass } from './components/TestClass';

const appElement = (
    <div>
        <h1>Hello</h1>
        <TestClass></TestClass>
    </div>
);

render(
    appElement,
    document.getElementById('app')
);