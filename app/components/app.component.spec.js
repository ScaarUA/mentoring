import template from './app.component';
import { expect } from 'chai';

describe('AppComponent', () => {

    it('should contain template', () => {
        expect(template).to.be.equal(`<div class="first-div"></div>`);
    });

});     