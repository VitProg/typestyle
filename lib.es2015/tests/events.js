import { style, reinit, events, getStyles } from '../index';
import * as assert from 'assert';
describe('@events', function () {
    it('updated event', function (done) {
        reinit();
        events.once('updated', function () {
            assert.equal(getStyles(), '.f5f13tn{color:red}@supports (display: flex){.f5f13tn{color:white}}');
            done();
        });
        style({
            color: 'red',
            $nest: {
                '@supports (display: flex)': {
                    color: 'white'
                }
            }
        });
    });
    it('render event', function (done) {
        reinit();
        events.once('render', function (css) {
            assert.equal(css, '.f5f13tn{color:red}@supports (display: flex){.f5f13tn{color:white}}');
            assert.equal(getStyles(), '.f5f13tn{color:red}@supports (display: flex){.f5f13tn{color:white}}');
            done();
        });
        style({
            color: 'red',
            $nest: {
                '@supports (display: flex)': {
                    color: 'white'
                }
            }
        });
    });
});
