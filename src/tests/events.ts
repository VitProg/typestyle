import {style, reinit, events, getStyles} from '../index';
import * as assert from 'assert';

describe('@events', () => {
  it('updated event', (done) => {
    reinit();

    events.once('updated', () => {
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

  it('render event', (done) => {
    reinit();

    events.once('render', (css) => {
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
