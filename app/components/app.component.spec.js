import { expect } from 'chai';
import {fn} from './app.component';

describe('AppComponent', () => {

    it('should contain template', () => {
        expect(fn()).to.be.equal(-1);
    });

});